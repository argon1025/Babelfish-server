import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '../Service/JWT.Service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // 토큰 권한 검증
    if (this.jwtService.roleVerify(request.headers.token, request.params.useremail)) {
      return true;
    } else {
      throw new HttpException({ msg_code: '4', msg: '다른 사용자 데이터에 접근할 권한이 없습니다' }, 401);
    }
  }
}
