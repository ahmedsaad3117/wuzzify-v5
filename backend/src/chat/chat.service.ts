import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatStore } from './chat.store';

/** Turn a raw "a=1; b=2" cookie string into an object for convenience in n8n. */
function parseCookies(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw) return out;
  for (const part of raw.split(';')) {
    const eq = part.indexOf('=');
    if (eq < 0) continue;
    const key = part.slice(0, eq).trim();
    if (!key) continue;
    out[key] = decodeURIComponent(part.slice(eq + 1).trim());
  }
  return out;
}

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly store: ChatStore,
    private readonly config: ConfigService,
  ) {}

  /** Store the user message and forward it to the configured n8n webhook. */
  async send(
    sessionId: string | undefined,
    ip: string,
    message: string,
    cookies?: string,
  ) {
    const session = this.store.ensure(sessionId, ip);
    this.store.append(session.id, 'user', message);

    const webhook = this.config.get<string>('N8N_WEBHOOK_URL');
    if (!webhook) {
      this.logger.error('N8N_WEBHOOK_URL is not configured');
      throw new ServiceUnavailableException('Chat is not configured');
    }

    const cookieString = cookies ?? '';
    const payload = {
      sessionId: session.id,
      ip,
      message,
      timestamp: new Date().toISOString(),
      cookies: cookieString,
      cookiesParsed: parseCookies(cookieString),
      callbackUrl: this.config.get<string>('CHAT_CALLBACK_URL') ?? null,
      callbackToken: this.config.get<string>('N8N_CALLBACK_TOKEN') ?? null,
    };

    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        this.logger.warn(`n8n webhook responded ${res.status}`);
        throw new BadGatewayException('Chat service rejected the message');
      }

      // Bonus: if n8n is configured to "Respond to Webhook" synchronously with a
      // reply, accept it immediately (the async callback path still works too).
      const contentType = res.headers.get('content-type') ?? '';
      if (contentType.includes('application/json')) {
        const data = (await res.json().catch(() => null)) as Record<
          string,
          unknown
        > | null;
        const reply = this.pickReply(data);
        if (reply) this.store.append(session.id, 'agent', reply);
      }
    } catch (err) {
      if (err instanceof BadGatewayException) throw err;
      this.logger.error(`Failed to reach n8n webhook: ${(err as Error).message}`);
      throw new BadGatewayException('Could not reach the chat service');
    }

    return { sessionId: session.id };
  }

  /** Called by n8n with the agent's reply for a given session. */
  callback(token: string | undefined, sessionId: unknown, reply: unknown) {
    const expected = this.config.get<string>('N8N_CALLBACK_TOKEN');
    if (expected) {
      if (token !== expected) throw new UnauthorizedException('Invalid callback token');
    } else {
      this.logger.warn(
        'N8N_CALLBACK_TOKEN is not set — accepting callback without auth (set it in production).',
      );
    }

    if (typeof sessionId !== 'string' || !sessionId) {
      throw new BadRequestException('sessionId is required');
    }
    if (typeof reply !== 'string' || !reply.trim()) {
      throw new BadRequestException('reply is required');
    }

    const stored = this.store.append(sessionId, 'agent', reply.trim());
    if (!stored) throw new NotFoundException('Unknown session');
    return { ok: true };
  }

  poll(sessionId: string | undefined, after: number) {
    if (!sessionId) throw new BadRequestException('sessionId is required');
    return this.store.agentAfter(sessionId, Number.isFinite(after) ? after : 0);
  }

  /** Tolerate the common reply field names n8n workflows produce. */
  private pickReply(data: Record<string, unknown> | null): string | null {
    if (!data) return null;
    const candidate =
      data.reply ?? data.message ?? data.text ?? data.output ?? data.answer;
    return typeof candidate === 'string' && candidate.trim()
      ? candidate.trim()
      : null;
  }
}
