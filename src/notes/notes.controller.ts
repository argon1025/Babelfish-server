import { Body, UseGuards } from '@nestjs/common';
import { Controller, Delete, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/Guard/Auth.Guard';
import { RoleGuard } from 'src/common/Guard/Role.Guard';
import { NoteAddDto } from './dto/Note.Add.dto';
import { NotesService } from './notes.service';

@UseGuards(AuthGuard) // 토큰 유효성 검증
@UseGuards(RoleGuard) // 사용자 권한 검증
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
  async GetUserNotes(@Headers('token') tokenData, @Param() paramsData) {
    const userNoteData = await this.notesService.getUserNoteList(paramsData.useremail);
    return this.notesService.responseCreator('유저 단어장 리스트를 정상적으로 반환 했습니다', 'n1-4', { data: userNoteData });
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
  async CreateNote(@Headers('token') tokenData, @Param() paramsData, @Body() bodyData: NoteAddDto) {
    const createNoteResult = await this.notesService.createUserNote(paramsData.useremail, bodyData.notename);
    return this.notesService.responseCreator('단어장을 등록했습니다', 'n2-4');
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
  async ModifyNote(@Headers('token') tokenData, @Param() paramsData, @Body() bodyData: NoteAddDto) {
    const modifyNoteResult = await this.notesService.modifyUserNote(paramsData.noteid, paramsData.useremail, bodyData.notename);
    return this.notesService.responseCreator('단어장정보를 수정했습니다.', 'n3-4');
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
  async DeleteNote(@Headers('token') tokenData, @Param() paramsData) {
    const deleteNoteResult = await this.notesService.deleteUserNote(paramsData.noteid, paramsData.useremail);
    return this.notesService.responseCreator('단어장을 삭제했습니다', 'n4-4');
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
  async LearningStatusUpdate(@Headers('token') tokenData, @Param() paramsData) {
    const learningStatusUpdateResult = await this.notesService.learningStatusUpdateForUserNote(paramsData.noteid, paramsData.useremail);
    return this.notesService.responseCreator('단어장 학습일자를 갱신했습니다', 'n5-4');
  }
}
