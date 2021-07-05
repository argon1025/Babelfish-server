import { Controller, Delete, Headers, Param, Put } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Account')
  @ApiOperation({ summary: '유저 정보를 변경합니다' })
  @ApiParam({
    name: 'useremail',
    type: 'string',
    required: true,
    description: '변경할 계정',
  })
  @ApiHeader({
    name: 'token',
    required: true,
    description: '로그인 후 발급받은 토큰 데이터',
  })
  @Put(':useremail')
  ChangeAccountInformation(@Headers('token') tokenData, @Param() paramsData) {
    return { paramsData: paramsData.useremail, tokenData: tokenData };
  }

  @ApiTags('Account')
  @ApiOperation({ summary: '서비스 탈퇴를 요청합니다' })
  @ApiParam({
    name: 'useremail',
    type: 'string',
    required: true,
    description: '삭제할 계정',
  })
  @ApiHeader({
    name: 'token',
    required: true,
    description: '로그인 후 발급받은 토큰 데이터',
  })
  @Delete(':useremail')
  DeleteAccount(@Headers('token') tokenData, @Param() paramsData) {
    return { paramsData: paramsData.useremail, tokenData: tokenData };
  }
}
