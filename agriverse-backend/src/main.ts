import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = 4000;
  await app.listen(port);
  console.log(`AgriVerse backend is running on http://localhost:${port}/api`);
}

bootstrap();



