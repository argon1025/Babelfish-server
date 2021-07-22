import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as JWT from 'jsonwebtoken';

@Injectable()
class Jwt {
  constructor(private readonly config: ConfigService) {}
  async sign(userId: string) {
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
    }
  }

  verify(token: string) {
    // 토큰 인증
    try {
      const KEY = this.config.get<string>('TOKEN_KEY');
      const TokenVerifyResult = JWT.verify(token, KEY);
      console.log(TokenVerifyResult);
    } catch (error) {
      console.log('error');
      console.error(error);
    }
  }
}
