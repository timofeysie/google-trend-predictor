import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      process.env.FRONTEND_URL,
      process.env.DJANGO_API_URL,
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
