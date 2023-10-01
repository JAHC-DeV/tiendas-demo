import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NeweggApiModule } from './Modules/newegg-api/newegg-api.module';
import { AmazonApiModule } from './Modules/amazon-api/amazon-api.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

import { EmailService } from './global/email/email.service';
import { FileUploadService } from './global/supabase/fileUpload.service';
import { BusinessModule } from './business/business.module';
import * as express from 'express';

@Module({
  imports: [NeweggApiModule, AmazonApiModule, UsersModule,DatabaseModule, AuthModule, RolesModule, BusinessModule],
  providers:[EmailService,FileUploadService]
})
export class AppModule {}

 