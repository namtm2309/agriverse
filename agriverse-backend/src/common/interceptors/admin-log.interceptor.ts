import {
  Inject,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class AdminLogInterceptor implements NestInterceptor {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const url = request.url;
    const user = (request as any).user; // JWT user từ guard

    // Chỉ log nếu có user (admin) và là thao tác CRUD (Only log if user exists and is CRUD operation)
    if (!user || !['POST', 'PUT', 'DELETE'].includes(method)) {
      return next.handle();
    }

    // Xác định targetType từ URL (Determine targetType from URL)
    const resourceMatch = url.match(/\/api\/([^\/]+)/);
    const targetType = resourceMatch ? resourceMatch[1] : 'unknown';

    // Xác định action (Determine action)
    let action = '';
    if (method === 'POST') action = 'CREATE';
    else if (method === 'PUT') action = 'UPDATE';
    else if (method === 'DELETE') action = 'DELETE';

    // Lấy targetId từ params hoặc body (Get targetId from params or body)
    const targetId =
      (request.params?.id && parseInt(request.params.id)) ||
      (request.body?.id && parseInt(request.body.id)) ||
      null;

    return next.handle().pipe(
      tap({
        next: async () => {
          // Log thành công (Log success)
          try {
            await this.prisma.adminLog.create({
              data: {
                adminId: user.id,
                action: `${action}_${targetType.toUpperCase()}`,
                targetType: targetType,
                targetId: targetId,
              },
            });
          } catch (error) {
            // Không throw lỗi nếu log fail (Don't throw if log fails)
            console.error('Failed to log admin action:', error);
          }
        },
        error: async (error) => {
          // Log lỗi nếu cần (Log error if needed)
          try {
            await this.prisma.adminLog.create({
              data: {
                adminId: user.id,
                action: `${action}_${targetType.toUpperCase()}_FAILED`,
                targetType: targetType,
                targetId: targetId,
              },
            });
          } catch (logError) {
            console.error('Failed to log admin action error:', logError);
          }
        },
      }),
    );
  }
}

