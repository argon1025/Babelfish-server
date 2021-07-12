import { HttpException, Injectable } from '@nestjs/common';
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
      throw new HttpException(
        { msg_code: 't6', msg: '이미 가입된 계정입니다.' },
        401,
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await this.membersRepository.save({
      userid: userId,
      name: name,
      password: hashedPassword,
      salt: 'null',
    });
    console.log(salt, hashedPassword);
    console.log(result);
  }
}
