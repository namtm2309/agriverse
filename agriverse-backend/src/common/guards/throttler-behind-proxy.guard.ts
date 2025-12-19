import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Reflector } from '@nestjs/core';
import { SKIP_THROTTLE_KEY } from '../decorators/skip-throttle.decorator';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  constructor(options: any, storageService: any, reflector: Reflector) {
    super(options, storageService, reflector);
  }

  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    // Kiểm tra decorator SkipThrottle (Check SkipThrottle decorator)
    const skipThrottle = this.reflector.getAllAndOverride<boolean>(SKIP_THROTTLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipThrottle) {
      return true;
    }

    return super.shouldSkip(context);
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    // Lấy IP từ header nếu có proxy (Get IP from header if behind proxy)
    return (
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.headers['x-real-ip'] ||
      req.ip ||
      req.connection?.remoteAddress ||
      'unknown'
    );
  }
}

