import { Controller, Get, Post, Patch, Delete, Body, HttpException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AccountLoginDto } from './dto/Account.Login.dto';
import { AccountRegistrationDto } from './dto/Account.Registration.dto';
import { TokenService } from './token.service';
import { JwtService } from '../common/Service/JWT.Service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService, private readonly userService: UsersService, private readonly jwtService: JwtService) {}

  @ApiTags('Account')
  @ApiOperation({ summary: '[Legacy] 서버에 회원등록을 요청합니다' })
  @Post('join')
  async AccountRegistration(@Body() bodyData: AccountRegistrationDto) {
    await this.userService.userRegistration(bodyData.userid, bodyData.name, bodyData.password, 'null');
    return this.userService.responseCreator('회원등록 되었습니다', 't7');
  }

  @ApiTags('Account')
  @ApiOperation({ summary: '[Legacy] 서버에 로그인을 요청합니다' })
  @Post()
  async AccountLogin(@Body() bodyData: AccountLoginDto) {
    const passwordValidation = await this.userService.userLogin(bodyData.userid, bodyData.password);
    // 토큰 발급
    const userToken: string = this.jwtService.sign(bodyData.userid);

    this.jwtService.verify('111');

    if (passwordValidation) {
      return this.userService.responseCreator('회원 인증에 성공했습니다', 't3', { token: userToken });
    } else {
      throw new HttpException({ msg_code: 't2', msg: '알수없는 이유로 인증에 실패했습니다...' }, 400);
    }
  }
}
