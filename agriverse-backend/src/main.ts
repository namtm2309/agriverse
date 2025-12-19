import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  // Static files: Serve uploaded images (Static files: Serve uploaded images)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  // CORS: Cho phép frontend React Admin kết nối (Allow React Admin frontend)
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Validation Pipe: Tự động validate DTOs (Auto-validate DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Chỉ giữ lại fields có trong DTO
      forbidNonWhitelisted: false, // Không throw lỗi nếu có field thừa (để tương thích React Admin)
      transform: true, // Tự động transform types (string -> number, etc.)
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Chuẩn hoá lỗi trả về: Tiếng Việt (English) (Normalize error responses)
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  // Swagger API Documentation (API Documentation)
  const config = new DocumentBuilder()
    .setTitle('AgriVerse API')
    .setDescription('API tài liệu cho hệ thống AgriVerse NFT (API documentation for AgriVerse NFT system)')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Nhập JWT token (Enter JWT token)',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'AgriVerse API Docs',
  });

  const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
  await app.listen(port);
  console.log(`Backend AgriVerse đang chạy tại (Running at): http://localhost:${port}/api`);
  console.log(`Swagger API Docs: http://localhost:${port}/api/docs`);
}

bootstrap();
