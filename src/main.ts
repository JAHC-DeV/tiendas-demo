import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Encarguitos Test')
    .setDescription('The encarguitos API description')
    .setVersion('1.0')
    .addTag('Ecommers')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /*const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Cambia a la URL de tu cliente
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Habilita el envío de cookies y encabezados de autenticación
  };*/
  app.enableCors();
  app.use(
    express.json({ limit: '50mb' }),
    express.urlencoded({ extended: true, limit: '50mb' }),
  );
  await app.listen(3000);
}
bootstrap();
