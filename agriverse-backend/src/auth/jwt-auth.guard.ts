import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const path: string = request.path || '';
    const url: string = request.url || '';
    const originalUrl: string = request.originalUrl || '';

    // Cho phép truy cập không cần token cho endpoint login, forgot-password, reset-password, static files, và health check
    // (Allow access without token for login, forgot-password, reset-password endpoints, static files, and health check)
    const isLoginEndpoint = 
      path.includes('/auth/login') ||
      url.includes('/auth/login') ||
      originalUrl.includes('/auth/login');
    
    const isForgotPasswordEndpoint = 
      path.includes('/auth/forgot-password') ||
      url.includes('/auth/forgot-password') ||
      originalUrl.includes('/auth/forgot-password');
    
    const isResetPasswordEndpoint = 
      path.includes('/auth/reset-password') ||
      url.includes('/auth/reset-password') ||
      originalUrl.includes('/auth/reset-password');
    
    const isStaticFile = 
      path.startsWith('/uploads/') ||
      url.startsWith('/uploads/') ||
      originalUrl.startsWith('/uploads/');

    const isHealthCheck = 
      path.includes('/health') ||
      url.includes('/health') ||
      originalUrl.includes('/health');

    if (isLoginEndpoint || isForgotPasswordEndpoint || isResetPasswordEndpoint || isStaticFile || isHealthCheck) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Không có quyền truy cập (Unauthorized)');
    }

    // Chỉ cho phép user có role ADMIN truy cập backend admin
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('Chỉ ADMIN được phép truy cập (Admin role required)');
    }

    return user;
  }
}


