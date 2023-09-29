import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './Dto/LoginRequestDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Post()
  async login(@Body() userData: LoginRequestDto){
    return await this.authService.login(userData);
  }
}
