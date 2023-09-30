import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './Entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { EmailService } from 'src/global/email/email.service';
import { EmailModule } from 'src/global/email/email.module';
import { FileUploadService } from 'src/global/supabase/fileUpload.service';
import { FileUploadModule } from 'src/global/supabase/fileUpload.module';

@Module({
  imports:[EmailModule,FileUploadModule,TypeOrmModule.forFeature([User,Role]),JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '2h' },
  })],
  controllers: [UsersController],
  providers: [UsersService,EmailService,FileUploadService], 
  exports:[UsersService]
})
export class UsersModule {}
