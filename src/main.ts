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
  app.use(express.json({ limit: '50mb' }), express.urlencoded({ extended: true, limit: '50mb' }))
  await app.listen(3000);
}
bootstrap();
