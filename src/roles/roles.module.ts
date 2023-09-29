import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/Entities/user.entity';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/global/email/email.module';

@Module({
  imports:[TypeOrmModule.forFeature([User,Role]),EmailModule],
  controllers: [RolesController],
  providers: [RolesService,UsersService],
})
export class RolesModule {}
