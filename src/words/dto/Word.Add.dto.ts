import { PickType } from '@nestjs/swagger';
import { Word } from '../../entities/Word';

export class WordAddDto extends PickType(Word, ['title', 'mean1', 'mean2']) {}
