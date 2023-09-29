import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { UsersService } from "src/users/users.service";
import { Request } from 'express';
export class BaseGuard implements CanActivate {
    constructor(jwtService: JwtService, userService: UsersService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {return true};
     extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];    
      return type === 'Bearer' ? token : undefined;
    }
  }