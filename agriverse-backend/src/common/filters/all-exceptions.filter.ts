import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';

function viEn(vi: string, en: string) {
  return `${vi} (${en})`;
}

function alreadyHasEnglishHint(message: string) {
  // Simple heuristic: if it already contains "(...)" assume it's in "Việt (English)" format.
  return /\(.+\)/.test(message);
}

function normalizeHttpMessage(msg: unknown): string {
  if (typeof msg === 'string') return msg;
  if (Array.isArray(msg)) return msg.map(String).join('; ');
  if (msg && typeof msg === 'object') {
    const m = (msg as any).message;
    if (typeof m === 'string') return m;
    if (Array.isArray(m)) return m.map(String).join('; ');
  }
  return '';
}

function mapCommonHttpMessage(message: string, statusCode: number) {
  // Nếu message rỗng hoặc là message mặc định tiếng Anh, đổi sang Việt (English)
  const lower = (message || '').toLowerCase();

  if (statusCode === 401 && (lower === 'unauthorized' || message === '')) {
    return viEn('Không có quyền truy cập', 'Unauthorized');
  }
  if (statusCode === 403 && (lower === 'forbidden' || message === '')) {
    return viEn('Bị từ chối truy cập', 'Forbidden');
  }
  if (statusCode === 404 && (lower === 'not found' || message === '')) {
    return viEn('Không tìm thấy', 'Not found');
  }
  if (statusCode === 400 && (lower === 'bad request' || message === '')) {
    return viEn('Yêu cầu không hợp lệ', 'Bad request');
  }

  return message;
}

function mapPrismaKnownError(e: Prisma.PrismaClientKnownRequestError) {
  switch (e.code) {
    case 'P2002':
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: viEn('Dữ liệu đã tồn tại', 'Unique constraint violation'),
      };
    case 'P2003':
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: viEn(
          'Không thể thao tác vì dữ liệu đang được sử dụng',
          'Foreign key constraint failed',
        ),
      };
    case 'P2025':
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: viEn('Không tìm thấy bản ghi', 'Record not found'),
      };
    default:
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: viEn('Lỗi cơ sở dữ liệu', `Database error ${e.code}`),
      };
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = viEn('Lỗi máy chủ nội bộ', 'Internal server error');

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse() as any;
      const rawMessage = normalizeHttpMessage(res?.message ?? res ?? exception.message);
      message = mapCommonHttpMessage(rawMessage || exception.message, statusCode) || message;

      // Nếu message chỉ có tiếng Anh, giữ English trong ngoặc và thêm Việt chung chung
      if (message && !alreadyHasEnglishHint(message)) {
        // Keep original as English hint
        message = viEn('Có lỗi xảy ra', message);
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const mapped = mapPrismaKnownError(exception);
      statusCode = mapped.statusCode;
      message = mapped.message;
    } else if (exception instanceof Error) {
      // Nếu có message tiếng Anh mặc định, bọc theo format Việt (English)
      if (exception.message && !alreadyHasEnglishHint(exception.message)) {
        message = viEn('Có lỗi xảy ra', exception.message);
      }
    }

    const body = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: (request as any)?.url,
    };

    httpAdapter.reply(ctx.getResponse(), body, statusCode);
  }
}
