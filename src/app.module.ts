import { Module } from '@nestjs/common';
import { NeweggApiModule } from './Modules/newegg-api/newegg-api.module';
import { AmazonApiModule } from './Modules/amazon-api/amazon-api.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './global/email/email.service';
import { EmailModule } from './global/email/email.module';
import { FileUploadService } from './global/supabase/fileUpload.service';

@Module({
  imports: [NeweggApiModule, AmazonApiModule, UsersModule,DatabaseModule, AuthModule, RolesModule],
  providers:[EmailService,FileUploadService]
})
export class AppModule {}
