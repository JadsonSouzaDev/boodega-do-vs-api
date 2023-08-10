import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGaurd } from '@nestjs/passport';
import { Role } from 'src/users/entities/user.entity';

@Injectable()
export class AuthGuard extends PassportAuthGaurd('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    const isAdmin = this.reflector.get<boolean>(
      'isAdmin',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    } else if (isAdmin) {
      const headers = context.switchToHttp().getRequest().headers;
      if (!headers.authorization) return false;
      const payload = this.parseJwt(headers.authorization);
      if (payload.role !== Role.ADMIN) {
        return false;
      }
    }

    return super.canActivate(context);
  }

  parseJwt(header) {
    const token = header.split(' ')[1];
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }
}
