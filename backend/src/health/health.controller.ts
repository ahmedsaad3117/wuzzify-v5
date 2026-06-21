import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok', service: 'wuzzify-v5-cms', time: new Date().toISOString() };
  }
}
