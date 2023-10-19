import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as session from 'express-session';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers['authorization']) {
      throw new HttpException(
        'Debes estar autenticado para consultar',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const res = await lastValueFrom(
      this.authClient
        .send(
          { cmd: 'authorization' },
          { token: request.headers['authorization']?.split(' ')[1] },
        )
        .pipe(map((res) => res)),
    );
    if (res.status === 401) {
      return;
    } else {
      request.user = res.user;
      session.user = res;
      return res;
    }
  }
}
