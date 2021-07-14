import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/Note';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private noteRepository: Repository<Note>) {}
  // 유저 노트 리스트를 조회해 반환
  async getUserNoteList(userId: string): Promise<Note[]> {
    const userNoteListData = await this.noteRepository.find({ where: { memberEmail: userId } });
    console.log(userNoteListData);
    return userNoteListData;
  }

  // 유저 노트를 생성
  async createUserNote(userId: string, noteName: string) {
    const createNoteResult = await this.noteRepository.save({ memberEmail: userId, notename: noteName, learningDay: null });
    console.log(createNoteResult);
  }

  // 유저 노트 정보 수정
  async modifyUserNote(noteId: number, userId: string, noteName: string) {
    const modifyNoteResult = await this.noteRepository.update({ id: noteId, memberEmail: userId }, { notename: noteName });
    console.log(modifyNoteResult);
  }

  // 유저 노트 삭제
  async deleteUserNote(noteId: number, userId: string) {
    const deleteNoteResult = await this.noteRepository.delete({ id: noteId, memberEmail: userId });
    console.log(deleteNoteResult);
  }

  // 유저 노트 학습상태 갱신
  async learningStatusUpdateForUserNote(noteId: number, userId: string) {
    const NOW_DATE = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const noteDataResult = await this.noteRepository.findOne({ id: noteId, memberEmail: userId });
    console.log(noteDataResult);
    const updateNoteResult = await this.noteRepository.update({ id: noteId, memberEmail: userId }, { learningDay: NOW_DATE, learningCount: 2 });
    console.log(updateNoteResult);
  }
}
