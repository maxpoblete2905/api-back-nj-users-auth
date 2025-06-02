import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  console.log('JWT_SECRET: ', process.env.JWT_SECRET);
  console.log('DB_HOST: ', process.env.DB_HOST);
  console.log('DB_PORT: ', process.env.DB_PORT);
  console.log('DB_USERNAME: ', process.env.DB_USERNAME);
  console.log('DB_PASSWORD: ', process.env.DB_PASSWORD);
  console.log('DB_DATABASE: ', process.env.DB_DATABASE);

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger UI available at: ${await app.getUrl()}/api`);
}
bootstrap();
