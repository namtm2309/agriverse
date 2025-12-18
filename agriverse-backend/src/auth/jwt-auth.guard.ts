import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const path: string = request.path || '';

    // Cho phép truy cập không cần token cho endpoint login
    if (path.startsWith('/api/auth/login') || path === '/auth/login') {
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


