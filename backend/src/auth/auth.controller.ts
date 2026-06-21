import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAdminGuard } from './jwt-admin.guard';
import type { AuthedRequest } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @UseGuards(JwtAdminGuard)
  @Get('me')
  me(@Req() req: AuthedRequest) {
    return this.auth.me(req.user.id);
  }
}
