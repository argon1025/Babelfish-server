import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/Note';

@Injectable()
export class WordsService {
  constructor(@InjectRepository(Note) private notesRepository: Repository<Note>) {}
  async getUserWordList(noteId: number, userId: string) {}
  async createUserWord(noteId: number, userId: string, wordTitle: string, wordMean1: string, wordMean2: string) {}
  async modifyUserWord(noteId: number, wordId: number, userId: string, wordTitle: string, wordMean1: string, wordMean2: string) {}
  async deleteUserWord(noteId: number, wordId: number, userId: string) {}
  async addWrongCountToWord(noteId: number, wordId: number, userId: string) {}
}
