/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: 'https://dot-one-26b272efdbb8.herokuapp.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
  };

  console.log('Setting up CORS with options:', corsOptions);
  app.enableCors(corsOptions);

  // Add a global middleware to log headers
  app.use((req, res, next) => {
    console.log('Incoming request headers:', req.headers);
    res.on('finish', () => {
      console.log('Response headers:', res.getHeaders());
    });
    next();
  });

  // Add shutdown hooks
  app.enableShutdownHooks();

  // Handle graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM signal. Starting graceful shutdown...');
    await app.close();
    process.exit(0);
  });

  await app.listen(3001);
}
bootstrap();
