import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../entities/Member';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Member) private membersRepository: Repository<Member>,
  ) {}

  async userAlreadyExist(userId: string): Promise<boolean> {
    const userData = await this.membersRepository.findOne({ userid: userId });
    console.log(userData);
    if (userData) {
      return true;
    } else {
      return false;
    }
  }
}
