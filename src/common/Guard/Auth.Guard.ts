import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '../Service/JWT.Service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      this.jwtService.verify(request.headers.token);
      return true;
    } catch (error) {
      throw new HttpException({ msg_code: '4', msg: '토큰데이터가 올바르지 않습니다' }, 401);
    }
  }
}
