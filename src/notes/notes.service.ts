import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/Note';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private noteRepository: Repository<Note>) {}

  // 유저 노트 리스트를 조회해 반환
  async getUserNoteList(userId: string): Promise<Note[]> {
    try {
      const userNoteListData = await this.noteRepository.find({ where: { memberEmail: userId } });
      return userNoteListData;
    } catch (error) {
      throw new HttpException({ msg_code: 'Fatal exception Error', msg: '엔드포인트 접근에 실패했습니다. 관리자에게 문의해 주세요' }, 500);
    }
  }

  // 유저 노트를 생성
  async createUserNote(userId: string, noteName: string) {
    try {
      await this.noteRepository.save({ memberEmail: userId, notename: noteName, learningDay: null });
    } catch (error) {
      throw new HttpException({ msg_code: 'n2-3', msg: '데이터베이스 에러로 단어장 등록에 실패했습니다.' }, 400);
    }
  }

  // 유저 노트 정보 수정
  async modifyUserNote(noteId: number, userId: string, noteName: string) {
    const ROW_NOT_CHANGED = 0;

    const modifyNoteResult = await this.noteRepository.update({ id: noteId, memberEmail: userId }, { notename: noteName });

    if (modifyNoteResult.affected === ROW_NOT_CHANGED) {
      throw new HttpException({ msg_code: 'n3-3', msg: '변경할 사항이 없거나 데이터베이스 에러로 수정에 실패했습니다.' }, 400);
    }
  }

  // 유저 노트 삭제
  async deleteUserNote(noteId: number, userId: string) {
    const ROW_NOT_CHANGED = 0;

    const deleteNoteResult = await this.noteRepository.delete({ id: noteId, memberEmail: userId });

    if (deleteNoteResult.affected === ROW_NOT_CHANGED) {
      throw new HttpException({ msg_code: 'n4-3', msg: '변경할 사항이 없거나 데이터베이스 에러로 수정에 실패했습니다.' }, 400);
    }
  }

  // 유저 노트 학습상태 갱신
  async learningStatusUpdateForUserNote(noteId: number, userId: string) {
    const noteDataResult = await this.noteRepository.findOne({ id: noteId, memberEmail: userId });
    if (!noteDataResult) {
      throw new HttpException({ msg_code: 'n5-3', msg: '변경할 사항이 없거나 데이터베이스 에러로 수정에 실패했습니다.' }, 400);
    }

    const NOW_DATE = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const LEARNING_COUNT = noteDataResult.learningCount + 1;
    const ROW_NOT_CHANGED = 0;

    const updateNoteResult = await this.noteRepository.update({ id: noteId, memberEmail: userId }, { learningDay: NOW_DATE, learningCount: LEARNING_COUNT });

    if (updateNoteResult.affected === ROW_NOT_CHANGED) {
      throw new HttpException({ msg_code: 'n5-3', msg: '변경할 사항이 없거나 데이터베이스 에러로 수정에 실패했습니다.' }, 400);
    }
  }

  // 응답 생성 서비스
  responseCreator(message: string, messageCode: string, data?: any) {
    let response: { error: string; msg: string; msg_code: string; data?: any } = {
      error: 'false',
      msg: message,
      msg_code: messageCode,
    };
    if (!!data) {
      response = { ...response, ...data };
    }
    return response;
  }
}
