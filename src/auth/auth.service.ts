import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from './Dto/LoginRequestDto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './Dto/LoginResponseDto';
import { User } from 'src/users/Entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }
  async login(loginData: LoginRequestDto) {
    const userInfo = await this.usersService.findOneByEmail(loginData);
    // console.log(userInfo)
    if (!userInfo)
      throw new HttpException('No esta registrado', HttpStatus.UNAUTHORIZED);
    const passValid = await bcrypt.compare(
      loginData.password,
      userInfo.password,
    );

    if (!passValid)
      throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
    if (userInfo.isEnable == false)
      throw new HttpException(
        'Usuario no activo revise su Email',
        HttpStatus.UNAUTHORIZED,
      );
    try {
      delete userInfo.password;
      const payload = {
        _id: userInfo.id,
        _name: userInfo.nickname,
        _business: userInfo?.business?.id,
      };

      const token = await this.jwtService.signAsync(payload);
      const hasBusiness = userInfo.business != null ? true : false;
      return new LoginResponseDto({ userInfo, hasBusiness, token });
    } catch (error) {
      console.log(error);
      throw new HttpException('Error al inicial', HttpStatus.UNAUTHORIZED);
    }
  }

  async AuthToken(token: string){
      const {_id} = await this.jwtService.verifyAsync(token);
      if(_id == null || _id == undefined){ throw new HttpException("Token Invalido.",HttpStatus.UNAUTHORIZED);}
      const userData = await this.usersService.findOneById(_id);
      return userData;
  }
}
