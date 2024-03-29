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
  
  @Injectable()
  export class OnlyAdmin extends BaseGuard {
    constructor(private jwtService: JwtService,private userService: UsersService) {super(jwtService,userService)}  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();    
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        //console.log(payload);
        const userData = await this.userService.findOneById(payload._id);     
        if(!userData.role.isAdmin) throw new HttpException("No tienes permisos solo admin.",HttpStatus.UNAUTHORIZED);
       // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch(error) {
        throw error;
      }
      return true;
    }

  }