import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './Member';
import { Word } from './Word';

@Index('member_email', ['memberEmail'], {})
@Entity('note', { schema: 'babelfish' })
export class Note {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'member_email', length: 50 })
  memberEmail: string;

  @Column('varchar', {
    name: 'name',
    nullable: true,
    length: 11,
    default: () => "'Vocabulary'",
  })
  @ApiProperty({
    example: 'TestNote',
    description: '노트 이름',
    required: true,
  })
  name: string | null;

  @Column('date', { name: 'Learning_Day', nullable: true })
  learningDay: string | null;

  @Column('int', {
    name: 'Learning_Count',
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  learningCount: number | null;

  @ManyToOne(() => Member, (member) => member.notes, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'member_email', referencedColumnName: 'email' }])
  memberEmail2: Member;

  @OneToMany(() => Word, (word) => word.note)
  words: Word[];
}
