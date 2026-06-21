import type { Request } from 'express';

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface AdminUser {
  id: string;
  email: string;
}

export interface AuthedRequest extends Request {
  user: AdminUser;
}
