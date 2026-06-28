import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';

/** First IP in X-Forwarded-For (set by Nginx), else the socket address. */
function clientIp(req: Request): string {
  const xff = req.headers['x-forwarded-for'];
  const header = Array.isArray(xff) ? xff[0] : xff;
  if (header) return header.split(',')[0].trim();
  return req.ip ?? req.socket?.remoteAddress ?? '';
}

@Controller('chat')
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  // Browser → send a message (forwarded to n8n).
  @Post('send')
  send(@Body() dto: SendMessageDto, @Req() req: Request) {
    // Prefer the cookies the browser reported; fall back to the request header.
    const cookies = dto.cookies ?? req.headers.cookie ?? '';
    return this.chat.send(dto.sessionId, clientIp(req), dto.message, cookies);
  }

  // n8n → deliver the agent's reply. Body shape is intentionally loose so it
  // tolerates whatever the n8n workflow sends (and bypasses the strict pipe).
  @Post('callback')
  @HttpCode(200)
  callback(
    @Body() body: Record<string, any>,
    @Headers('x-callback-token') headerToken?: string,
  ) {
    const token = headerToken || body?.token || body?.callbackToken;
    const sessionId = body?.sessionId ?? body?.session_id;
    const reply = body?.reply ?? body?.message ?? body?.text ?? body?.output;
    return this.chat.callback(token, sessionId, reply);
  }

  // Browser → poll for new agent replies since `after`.
  @Get('poll')
  poll(@Query('sessionId') sessionId?: string, @Query('after') after?: string) {
    return this.chat.poll(sessionId, after ? Number(after) : 0);
  }
}
