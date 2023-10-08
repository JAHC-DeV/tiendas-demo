import {    
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from '../auth/constants';
import { BaseGuard } from './baseGuard.guard';
import { BusinessService } from 'src/business/business.service';
  
  @Injectable()
  export class HasBusiness extends BaseGuard {
    constructor(private jwtService: JwtService,private userService: UsersService,private businessService:BusinessService) {super(jwtService,userService)}  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();    
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new HttpException("No Tienes Permiso.",HttpStatus.UNAUTHORIZED);
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        if(payload._business == undefined || payload._business == null) throw new HttpException("No Tienes Permiso.",HttpStatus.UNAUTHORIZED);
        const businessData = await this.businessService.findOneById(payload._business);     
        if(!businessData) throw new HttpException("No Tienes Permiso.",HttpStatus.UNAUTHORIZED);

        request['user'] = payload;
      } catch(error) {
        throw error;
      }
      return true;
    }

  }