import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/Note';

@Injectable()
export class WordsService {
  constructor(@InjectRepository(Note) private notesRepository: Repository<Note>) {}

  // 단어 리스트
  async getUserWordList(noteId: number) {
    try {
      const userWordListData = await this.notesRepository.find({ where: { noteId: noteId } });
      return userWordListData;
    } catch (error) {
      throw new HttpException({ msg_code: 'Fatal exception Error', msg: '엔드포인트 접근에 실패했습니다. 관리자에게 문의해 주세요' }, 500);
    }
  }

  // 단어 생성
  async createUserWord(noteId: number, userId: string, wordTitle: string, wordMean1: string, wordMean2: string) {}

  // 단어 수정
  async modifyUserWord(noteId: number, wordId: number, userId: string, wordTitle: string, wordMean1: string, wordMean2: string) {}

  // 단어 삭제
  async deleteUserWord(noteId: number, wordId: number, userId: string) {}

  // 단어 오답 횟수 증가
  async addWrongCountToWord(noteId: number, wordId: number, userId: string) {}
}
