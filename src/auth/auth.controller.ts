import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './Dto/LoginRequestDto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post()
  async login(@Body() userData: LoginRequestDto) {
    return await this.authService.login(userData);
  }
  @Get('/key=:token')
  async authToken(@Param('token') token: string) {    
    return this.authService.AuthToken(token);
  }
}
