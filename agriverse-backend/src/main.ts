import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Chuẩn hoá lỗi trả về: Tiếng Việt (English)
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  const port = 4000;
  await app.listen(port);
  console.log(`Backend AgriVerse đang chạy tại (Running at): http://localhost:${port}/api`);
}

bootstrap();



