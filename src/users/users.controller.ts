import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './Dto/RegisterDto';
import { NeedLoginGuard } from 'src/Guard/needLogin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OnlyAdmin } from 'src/Guard/onlyAdmin.guard';
import { AssignRoleDto } from './Dto/AssignRoleDto';
import { EmailService } from 'src/global/email/email.service';


@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly service: UsersService,private readonly email:EmailService) { }
  @ApiBearerAuth()
  @Get()
  @UseGuards(OnlyAdmin)
  async findAll() {
    return this.service.findAll();
  }

  @Post()
  async createUser(@Body(ValidationPipe) userData: RegisterDto) {
    return await this.service.createUser(userData)
  }

  @ApiBearerAuth()
  @UseGuards(OnlyAdmin)
  @Post('/updateRole')
  async assignNewRole(@Body(ValidationPipe) assignRoleDto: AssignRoleDto) {
    return this.service.assignRole(assignRoleDto);
  }

  @ApiBearerAuth()
  @UseGuards(OnlyAdmin)
  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    this.service.removeUser(id);
  }
  @Get('/active/:token')
  async activeUser(@Param('token') token: string) {
    return this.service.activateAccount(token);
  }
}
