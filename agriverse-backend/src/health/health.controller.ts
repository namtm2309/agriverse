import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '../common/decorators/skip-throttle.decorator';
import { HealthService } from './health.service';

@Controller('health')
@SkipThrottle() // Bỏ qua rate limiting cho health check (Skip rate limiting for health check)
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check() {
    return this.healthService.check();
  }
}

