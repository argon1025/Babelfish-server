import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../entities/Member';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Member) private membersRepository: Repository<Member>,
  ) {}

  async userAlreadyExist(userId: string): Promise<boolean> {
    const userData = await this.membersRepository.findOne({ userid: userId });
    if (userData) {
      // 유저 데이터가 존재
      return true;
    } else {
      // 유저 데이터가 존재하지 않음
      return false;
    }
  }

  async userRegistration(
    userId: string,
    name: string,
    password: string,
    salt: string,
  ) {
    if (await this.userAlreadyExist(userId)) {
      console.log('유저가 이미 존재합니다');
      return false;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    const result = await this.membersRepository.save({
      userid: userId,
      name: name,
      password: hashedPassword,
      salt: 'null',
    });
    console.log(result);
  }
}
