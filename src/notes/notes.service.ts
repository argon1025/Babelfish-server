import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/Note';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private noteRepository: Repository<Note>) {}
  // 유저 노트 리스트를 조회해 반환
  getUserNoteList() {}

  // 유저 노트를 생성
  createUserNote() {}

  // 유저 노트 정보 수정
  modifyUserNote() {}

  // 유저 노트 삭제
  deleteUserNote() {}

  // 유저 노트 학습상태 갱신
  learningStatusUpdateForUserNote() {}
}
