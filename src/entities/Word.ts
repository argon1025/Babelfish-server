import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Note } from './Note';

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
  wordTitle: string | null;

  @Column('varchar', {
    name: 'Mean1',
    nullable: true,
    length: 30,
    default: () => "'Mean1'",
  })
  mean1: string | null;

  @Column('varchar', {
    name: 'Mean2',
    nullable: true,
    length: 30,
    default: () => "'Mean2'",
  })
  mean2: string | null;

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
