import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  console.log('DB_TYPE: ', process.env.DB_TYPE);
  console.log('DB_HOST: ', process.env.DB_HOST);
  console.log('DB_PORT: ', process.env.DB_PORT);
  console.log('DB_USERNAME: ', process.env.DB_USERNAME);
  console.log('DB_PASSWORD: ', process.env.DB_PASSWORD);
  console.log('DB_DATABASE: ', process.env.DB_DATABASE);

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
