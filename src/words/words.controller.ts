import { Controller, Get, Param, Headers, Body, Post, Put, Delete } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { threadId } from 'worker_threads';
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
  async GetWordsList(@Headers('token') tokenData, @Param() paramsData) {
    const userWordData = await this.wordsService.getUserWordList(paramsData.noteid);
    return this.wordsService.responseCreator('정상적으로 작업을 수행 했습니다', 'w1-4', { data: userWordData });
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
  async AddNewWord(@Headers('token') tokenData, @Param() paramsData, @Body() bodyData: WordAddDto) {
    await this.wordsService.createUserWord(paramsData.noteid, paramsData.useremail, bodyData.title, bodyData.mean1, bodyData.mean2);
    return this.wordsService.responseCreator('단어를 등록했습니다', 'w2-5');
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
  async ModifyWord(@Headers('token') tokenData, @Param() paramsData, @Body() bodyData: WordModifyDto) {
    await this.wordsService.modifyUserWord(paramsData.noteid, paramsData.wordid, paramsData.useremail, bodyData.title, bodyData.mean1, bodyData.mean2);
    return this.wordsService.responseCreator('단어를 수정했습니다', 'w3-5');
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
  async DeleteWord(@Headers('token') tokenData, @Param() paramsData) {
    await this.wordsService.deleteUserWord(paramsData.noteid, paramsData.wordid, paramsData.useremail);
    return this.wordsService.responseCreator('단어를 삭제했습니다', 'w4-5');
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
  async AddWordWrongCount(@Headers('token') tokenData, @Param() paramsData) {
    await this.wordsService.addWrongCountToWord(paramsData.noteid, paramsData.wordid, paramsData.useremail);
    return this.wordsService.responseCreator('정상적으로 작업을 수행 했습니다', 'w5-5');
  }
}
