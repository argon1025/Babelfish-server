import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from '../entities/Word';

@Injectable()
export class WordsService {
  constructor(@InjectRepository(Word) private wordsRepository: Repository<Word>) {}

  // 단어 리스트
  async getUserWordList(noteId: number) {
    try {
      const userWordListData = await this.wordsRepository.find({ where: { noteId: noteId } });
      return userWordListData;
    } catch (error) {
      throw new HttpException({ msg_code: 'Fatal exception Error', msg: '엔드포인트 접근에 실패했습니다. 관리자에게 문의해 주세요' }, 500);
    }
  }

  // 단어 생성
  async createUserWord(noteId: number, userId: string, wordTitle: string, wordMean1: string, wordMean2: string) {
    try {
      await this.wordsRepository.save({ noteId: noteId, title: wordTitle, mean1: wordMean1, mean2: wordMean2, wrongCount: null });
    } catch (error) {
      throw new HttpException({ msg_code: 'w2-3', msg: '변경할 사항이 없거나 데이터베이스 에러로 추가에 실패했습니다' }, 500);
    }
  }

  // 단어 수정
  async modifyUserWord(noteId: number, wordId: number, userId: string, wordTitle: string, wordMean1: string, wordMean2: string) {
    const ROW_NOT_CHANGED = 0;

    const modifyWordResult = await this.wordsRepository.update({ id: wordId, noteId: noteId }, { title: wordTitle, mean1: wordMean1, mean2: wordMean2 });

    if (modifyWordResult.affected === ROW_NOT_CHANGED) {
      throw new HttpException({ msg_code: 'w3-3', msg: '변경할 사항이 없거나 데이터베이스 에러로 수정에 실패했습니다.' }, 400);
    }
  }

  // 단어 삭제
  async deleteUserWord(noteId: number, wordId: number, userId: string) {
    const ROW_NOT_CHANGED = 0;

    const deleteWordResult = await this.wordsRepository.delete({ id: wordId, noteId: noteId });

    if (deleteWordResult.affected === ROW_NOT_CHANGED) {
      throw new HttpException({ msg_code: 'w4-3', msg: '변경할 사항이 없거나 데이터베이스 에러로 수정에 실패했습니다.' }, 400);
    }
  }

  // 단어 오답 횟수 증가
  async addWrongCountToWord(noteId: number, wordId: number, userId: string) {
    const userWordData = await this.wordsRepository.findOne({ where: { noteId: noteId, id: wordId } });
    if (!userWordData) {
      throw new HttpException({ msg_code: 'w5-3', msg: '변경할 사항이 없거나 데이터베이스 에러로 수정에 실패했습니다.' }, 400);
    }

    const wordWrongCount = userWordData.wrongCount + 1;
    const ROW_NOT_CHANGED = 0;

    const updateWordWrongCount = await this.wordsRepository.update({ id: wordId, noteId: noteId }, { wrongCount: wordWrongCount });
    if (updateWordWrongCount.affected === ROW_NOT_CHANGED) {
      throw new HttpException({ msg_code: 'w5-3', msg: '변경할 사항이 없거나 데이터베이스 에러로 수정에 실패했습니다.' }, 400);
    }
  }
}
