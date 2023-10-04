import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/Entities/user.entity';
import { FileUploadModule } from 'src/global/supabase/fileUpload.module';
import * as express from 'express';

@Module({
  imports:[TypeOrmModule.forFeature([Business,User]),UsersModule,FileUploadModule],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Configura Express para aumentar el límite de tamaño del cuerpo de la solicitud
    consumer
      .apply(express.json({ limit: '50mb' }), express.urlencoded({ extended: true, limit: '50mb' }))
      .forRoutes('*');
  }}
