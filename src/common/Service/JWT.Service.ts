import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly config: ConfigService) {}
  sign(userId: string) {
    // 토큰 발급
    try {
      const TOKEN_INFO = {
        sub: `babelfish_token`,
        iss: `argon1025@gmail.com`,
        aud: `user`,
        userid: userId,
      };
      const KEY = this.config.get<string>('TOKEN_KEY');
      const TOKEN_OPTION = {
        expiresIn: '30m', // 유효시간
      };
      const tokenData = JWT.sign(TOKEN_INFO, KEY, TOKEN_OPTION);
      return tokenData;
    } catch (error) {
      console.error('error');
      console.error(error);
      throw new HttpException({ msg_code: '4', msg: '알수없는 이유로 토큰 발급에 실패했습니다...' }, 500);
    }
  }

  verify(token: string) {
    // 토큰 인증
    try {
      const KEY = this.config.get<string>('TOKEN_KEY');
      const TokenVerifyResult = JWT.verify(token, KEY);

      return TokenVerifyResult;
    } catch (error) {
      console.log('error');
      console.error(error);
      throw new HttpException({ msg_code: '4', msg: '토큰데이터가 올바르지 않습니다' }, 401);
    }
  }
  roleVerify(token: string, userId: string) {
    try {
      const KEY = this.config.get<string>('TOKEN_KEY');
      const TokenVerifyResult = <any>JWT.verify(token, KEY);

      if (TokenVerifyResult.userid === userId) {
        return true;
      }
    } catch (error) {
      console.log('error');
      console.error(error);
      return false;
    }
  }
}
