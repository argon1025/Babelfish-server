import { PickType } from '@nestjs/swagger';
import { Note } from '../../entities/Note';

export class NoteAddDto extends PickType(Note, ['notename']) {}
