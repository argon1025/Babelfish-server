import { PickType } from '@nestjs/swagger';
import { Member } from '../../entities/Member';

export class AccountLoginDto extends PickType(Member, [
  'userid',
  'password',
] as const) {}
