import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cors = {
    origin: ['http://localhost:3001'],
    methods: 'GET, POST, PUT, PATCH, DELETE, UPDATE, OPTIONS, HEAD',
  };

  app.enableCors(cors);

  await app.listen(3001);
}
bootstrap();
