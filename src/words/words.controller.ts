import {
  Controller,
  Get,
  Param,
  Headers,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { WordAddDto } from './dto/Word.Add.dto';
import { WordModifyDto } from './dto/Word.Modify.dto';
import { WordsService } from './words.service';

@Controller('api/users/:useremail/notes/:noteid/words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @ApiTags('Words')
  @ApiOperation({ summary: '단어장에 등록된 단어리스트를 요청합니다' })
  @ApiHeader({
    name: 'token',
    required: true,
    description: '로그인 후 발급받은 토큰 데이터',
  })
  @ApiParam({
    name: 'useremail',
    type: 'string',
    required: true,
    description: '계정',
  })
  @ApiParam({
    name: 'noteid',
    type: 'number',
    required: true,
    description: '노트 아이디',
  })
  @Get()
  GetWordsList(@Headers('token') tokenData, @Param() paramsData) {
    return {
      tokenData: tokenData,
      useremail: paramsData.useremail,
      noteid: paramsData.noteid,
    };
  }

  @ApiTags('Words')
  @ApiOperation({ summary: '단어장에 단어 등록을 요청합니다' })
  @ApiHeader({
    name: 'token',
    required: true,
    description: '로그인 후 발급받은 토큰 데이터',
  })
  @ApiParam({
    name: 'useremail',
    type: 'string',
    required: true,
    description: '계정',
  })
  @ApiParam({
    name: 'noteid',
    type: 'number',
    required: true,
    description: '노트 아이디',
  })
  @Post()
  AddNewWord(
    @Headers('token') tokenData,
    @Param() paramsData,
    @Body() bodyData: WordAddDto,
  ) {
    return {
      tokenData: tokenData,
      useremail: paramsData.useremail,
      noteid: paramsData.noteid,
      bodyData: bodyData,
    };
  }

  @ApiTags('Words')
  @ApiOperation({ summary: '단어 수정을 요청합니다' })
  @ApiHeader({
    name: 'token',
    required: true,
    description: '로그인 후 발급받은 토큰 데이터',
  })
  @ApiParam({
    name: 'useremail',
    type: 'string',
    required: true,
    description: '계정',
  })
  @ApiParam({
    name: 'noteid',
    type: 'number',
    required: true,
    description: '노트 아이디',
  })
  @ApiParam({
    name: 'wordid',
    type: 'number',
    required: true,
    description: '단어 아이디',
  })
  @Put(':wordid')
  ModifyWord(
    @Headers('token') tokenData,
    @Param() paramsData,
    @Body() bodyData: WordModifyDto,
  ) {
    return {
      tokenData: tokenData,
      useremail: paramsData.useremail,
      noteid: paramsData.noteid,
      wordid: paramsData.wordid,
      bodyData: bodyData,
    };
  }

  @ApiTags('Words')
  @ApiOperation({ summary: '단어 삭제를 요청합니다' })
  @ApiHeader({
    name: 'token',
    required: true,
    description: '로그인 후 발급받은 토큰 데이터',
  })
  @ApiParam({
    name: 'useremail',
    type: 'string',
    required: true,
    description: '계정',
  })
  @ApiParam({
    name: 'noteid',
    type: 'number',
    required: true,
    description: '노트 아이디',
  })
  @ApiParam({
    name: 'wordid',
    type: 'number',
    required: true,
    description: '단어 아이디',
  })
  @Delete(':wordid')
  DeleteWord(@Headers('token') tokenData, @Param() paramsData) {
    return {
      tokenData: tokenData,
      useremail: paramsData.useremail,
      noteid: paramsData.noteid,
      wordid: paramsData.wordid,
    };
  }

  @ApiTags('Words')
  @ApiOperation({ summary: '단어 시험 오답 횟수 누적을 요청합니다' })
  @ApiHeader({
    name: 'token',
    required: true,
    description: '로그인 후 발급받은 토큰 데이터',
  })
  @ApiParam({
    name: 'useremail',
    type: 'string',
    required: true,
    description: '계정',
  })
  @ApiParam({
    name: 'noteid',
    type: 'number',
    required: true,
    description: '노트 아이디',
  })
  @ApiParam({
    name: 'wordid',
    type: 'number',
    required: true,
    description: '단어 아이디',
  })
  @Put(':wordid/wrong-count')
  AddWordWrongCount(@Headers('token') tokenData, @Param() paramsData) {
    return {
      tokenData: tokenData,
      useremail: paramsData.useremail,
      noteid: paramsData.noteid,
      wordid: paramsData.wordid,
    };
  }
}
