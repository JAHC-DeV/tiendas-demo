import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './Dto/RegisterDto';
import { NeedLoginGuard } from 'src/Guard/needLogin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OnlyAdmin } from 'src/Guard/onlyAdmin.guard';
import { AssingRoleDto } from './Dto/AssingRoleDto';
import { EmailService } from 'src/global/email/email.service';


@Controller('users')
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
  @Post("/updateRole")
  async assingNewRole(@Body(ValidationPipe) assingRoleDto: AssingRoleDto) {
    return this.service.assingRole(assingRoleDto);
  }

  @ApiBearerAuth()
  @UseGuards(OnlyAdmin)
  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    this.service.removeUser(id);
  }

  
}
