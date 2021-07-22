import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from './Note';
import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';

@Index('note_id', ['noteId'], {})
@Entity('word', { schema: 'babelfish' })
export class Word {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'note_id', unsigned: true })
  noteId: number;

  @Column('varchar', {
    name: 'Word_Title',
    nullable: true,
    length: 30,
    default: () => "'Vocabulary'",
  })
  @ApiProperty({
    example: 'word',
    description: '단어',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  Word_Title: string | null;

  @Column('varchar', {
    name: 'Mean1',
    nullable: true,
    length: 30,
    default: () => "'Mean1'",
  })
  @ApiProperty({
    example: '워드',
    description: '발음',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  Mean1: string | null;

  @Column('varchar', {
    name: 'Mean2',
    nullable: true,
    length: 30,
    default: () => "'Mean2'",
  })
  @ApiProperty({
    example: '단어',
    description: '단어 뜻',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  Mean2: string | null;

  @Column('int', {
    name: 'Wrong_Count',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  wrongCount: number | null;

  @ManyToOne(() => Note, (note) => note.words, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'note_id', referencedColumnName: 'id' }])
  note: Note;
}
