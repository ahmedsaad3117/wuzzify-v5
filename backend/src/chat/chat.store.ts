import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export type ChatRole = 'user' | 'agent';

export interface ChatMessage {
  seq: number;
  role: ChatRole;
  text: string;
  at: string;
}

interface ChatSession {
  id: string;
  ip: string;
  messages: ChatMessage[];
  seq: number;
  createdAt: number;
  lastActivity: number;
}

/**
 * In-memory chat session store.
 *
 * Fine for a single backend process (the PM2 app runs in fork mode with one
 * instance). If you ever scale to multiple instances, swap this for a shared
 * store (Redis or a DB table) so /chat/callback and /chat/poll see the same data.
 */
@Injectable()
export class ChatStore {
  private readonly sessions = new Map<string, ChatSession>();
  private readonly ttlMs: number;
  private readonly maxMessages = 200;

  constructor() {
    const ttlMin = Number(process.env.CHAT_SESSION_TTL_MIN ?? 120);
    this.ttlMs = (Number.isFinite(ttlMin) ? ttlMin : 120) * 60_000;
    const timer = setInterval(() => this.sweep(), 5 * 60_000);
    // Don't keep the event loop alive just for the sweeper.
    (timer as { unref?: () => void }).unref?.();
  }

  /** Reuse an existing session (refresh IP/activity) or create a new one. */
  ensure(id: string | undefined, ip: string): ChatSession {
    if (id) {
      const existing = this.sessions.get(id);
      if (existing) {
        existing.lastActivity = Date.now();
        if (ip) existing.ip = ip;
        return existing;
      }
    }
    const now = Date.now();
    const session: ChatSession = {
      id: randomUUID(),
      ip,
      messages: [],
      seq: 0,
      createdAt: now,
      lastActivity: now,
    };
    this.sessions.set(session.id, session);
    return session;
  }

  append(id: string, role: ChatRole, text: string): ChatMessage | undefined {
    const session = this.sessions.get(id);
    if (!session) return undefined;
    const message: ChatMessage = {
      seq: ++session.seq,
      role,
      text,
      at: new Date().toISOString(),
    };
    session.messages.push(message);
    session.lastActivity = Date.now();
    if (session.messages.length > this.maxMessages) {
      session.messages.splice(0, session.messages.length - this.maxMessages);
    }
    return message;
  }

  /** Agent messages newer than `after`, plus the new cursor to poll from. */
  agentAfter(id: string, after: number): { messages: ChatMessage[]; cursor: number } {
    const session = this.sessions.get(id);
    if (!session) return { messages: [], cursor: after };
    session.lastActivity = Date.now();
    const messages = session.messages.filter(
      (m) => m.role === 'agent' && m.seq > after,
    );
    const cursor = messages.length ? messages[messages.length - 1].seq : after;
    return { messages, cursor };
  }

  private sweep(): void {
    const cutoff = Date.now() - this.ttlMs;
    for (const [id, session] of this.sessions) {
      if (session.lastActivity < cutoff) this.sessions.delete(id);
    }
  }
}
