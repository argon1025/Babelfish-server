import { PickType } from '@nestjs/swagger';
import { Member } from '../../entities/Member';

export class AccountRegistrationDto extends PickType(Member, [
  'userid',
  'name',
  'password',
]) {}
