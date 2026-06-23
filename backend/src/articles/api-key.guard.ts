import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

/**
 * Protects the external "ingest" endpoint with a static API key.
 * Send it as `x-api-key: <ARTICLES_API_KEY>` (or `Authorization: Bearer <key>`).
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const expected = this.config.get<string>('ARTICLES_API_KEY');
    if (!expected) {
      throw new ServiceUnavailableException('Article ingest API is not configured');
    }

    const req = context.switchToHttp().getRequest<Request>();
    const headerKey = req.headers['x-api-key'];
    const provided =
      (Array.isArray(headerKey) ? headerKey[0] : headerKey) ||
      bearer(req.headers.authorization);

    if (!provided || provided !== expected) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}

function bearer(header?: string): string | undefined {
  if (!header) return undefined;
  const [scheme, token] = header.split(' ');
  return scheme === 'Bearer' ? token : undefined;
}
