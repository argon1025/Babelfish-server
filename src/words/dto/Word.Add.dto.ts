import { PickType } from '@nestjs/swagger';
import { Word } from '../../entities/Word';

export class WordAddDto extends PickType(Word, ['Word_Title', 'Mean1', 'Mean2']) {}
