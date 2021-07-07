import { Column, Entity, OneToMany } from 'typeorm';
import { Note } from './Note';

@Entity('member', { schema: 'babelfish' })
export class Member {
  @Column('varchar', { primary: true, name: 'email', length: 50 })
  email: string;

  @Column('varchar', {
    name: 'name',
    nullable: true,
    length: 11,
    default: () => "'User'",
  })
  name: string | null;

  @Column('varchar', { name: 'password', length: 64 })
  password: string;

  @Column('varchar', { name: 'salt', length: 64 })
  salt: string;

  @OneToMany(() => Note, (note) => note.memberEmail2)
  notes: Note[];
}
