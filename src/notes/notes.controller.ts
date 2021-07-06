import { Body } from '@nestjs/common';
import {
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { NoteAddDto } from './dto/Note.Add.dto';
import { NotesService } from './notes.service';

@Controller('api/users/:useremail/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @ApiTags('Notes')
  @ApiOperation({ summary: '유저의 단어장 리스트를 요청합니다' })
  @ApiHeader({
    name: 'token',
    required: true,
    description: '로그인 후 발급받은 토큰 데이터',
  })
  @ApiParam({
    name: 'useremail',
    type: 'string',
    required: true,
    description: '사용자 계정',
  })
  @Get()
  GetUserNotes(@Headers('token') tokenData, @Param() paramsData) {
    return { token: tokenData, usermail: paramsData.useremail };
  }

  @ApiTags('Notes')
  @ApiOperation({ summary: '단어장을 생성합니다.' })
  @ApiHeader({
    name: 'token',
    required: true,
    description: '로그인 후 발급받은 토큰 데이터',
  })
  @ApiParam({
    name: 'useremail',
    type: 'string',
    required: true,
    description: '사용자 계정',
  })
  @Post()
  CreateNote(
    @Headers('token') tokenData,
    @Param() paramsData,
    @Body() bodyData: NoteAddDto,
  ) {
    return {
      token: tokenData,
      usermail: paramsData.useremail,
      bodyData: bodyData,
    };
  }

  @ApiTags('Notes')
  @ApiOperation({ summary: '단어장을 수정합니다.' })
  @ApiHeader({
    name: 'token',
    required: true,
    description: '로그인 후 발급받은 토큰 데이터',
  })
  @ApiParam({
    name: 'useremail',
    type: 'string',
    required: true,
    description: '사용자 계정',
  })
  @ApiParam({
    name: 'noteid',
    type: 'number',
    required: true,
    description: '노트 아이디',
  })
  @Put(':noteid')
  ModifyNote(
    @Headers('token') tokenData,
    @Param() paramsData,
    @Body() bodyData: NoteAddDto,
  ) {
    return {
      token: tokenData,
      usermail: paramsData.useremail,
      noteid: paramsData.noteid,
      bodyData: bodyData,
    };
  }

  @ApiTags('Notes')
  @ApiOperation({ summary: '단어장을 삭제합니다.' })
  @ApiHeader({
    name: 'token',
    required: true,
    description: '로그인 후 발급받은 토큰 데이터',
  })
  @ApiParam({
    name: 'useremail',
    type: 'string',
    required: true,
    description: '사용자 계정',
  })
  @ApiParam({
    name: 'noteid',
    type: 'number',
    required: true,
    description: '노트 아이디',
  })
  @Delete(':noteid')
  DeleteNote(@Headers('token') tokenData, @Param() paramsData) {
    return {
      token: tokenData,
      usermail: paramsData.useremail,
      noteid: paramsData.noteid,
    };
  }

  @ApiTags('Notes')
  @ApiOperation({ summary: '단어장 학습상태를 갱신합니다' })
  @ApiHeader({
    name: 'token',
    required: true,
    description: '로그인 후 발급받은 토큰 데이터',
  })
  @ApiParam({
    name: 'useremail',
    type: 'string',
    required: true,
    description: '사용자 계정',
  })
  @ApiParam({
    name: 'noteid',
    type: 'number',
    required: true,
    description: '노트 아이디',
  })
  @Put(':noteid/updated-date')
  NoteLearningDayRenew(@Headers('token') tokenData, @Param() paramsData) {
    return {
      token: tokenData,
      usermail: paramsData.useremail,
      noteid: paramsData.noteid,
    };
  }
}
