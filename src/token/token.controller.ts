import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountLoginDto } from './dto/Account.Login.dto';
import { AccountRegistrationDto } from './dto/Account.Registration.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @ApiTags('Account')
  @ApiOperation({ summary: '[Legacy] 서버에 회원등록을 요청합니다' })
  @Post('join')
  AccountRegistration(@Body() bodyData: AccountRegistrationDto) {
    return bodyData;
  }

  @ApiTags('Account')
  @ApiOperation({ summary: '[Legacy] 서버에 로그인을 요청합니다' })
  @Post()
  AccountLogin(@Body() bodyData: AccountLoginDto) {
    return bodyData;
  }
}
