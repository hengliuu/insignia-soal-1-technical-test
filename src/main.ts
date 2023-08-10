import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cors = {
    origin: ['http://localhost:3001'],
    methods: 'GET, POST, PUT, PATCH, DELETE, UPDATE, OPTIONS, HEAD',
  };

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(cors);

  await app.listen(3001);
}
bootstrap();
