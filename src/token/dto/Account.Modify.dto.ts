import { PickType } from '@nestjs/swagger';
import { Member } from '../../entities/Member';

export class AccountModifyDto extends PickType(Member, ['name', 'password'] as const) {}
