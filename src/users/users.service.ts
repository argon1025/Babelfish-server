import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../entities/Member';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Member) private membersRepository: Repository<Member>) {}

  // 유저 가입 확인 서비스
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

  // 유저 가입 서비스
  async userRegistration(userId: string, name: string, password: string, salt: string) {
    if (await this.userAlreadyExist(userId)) {
      throw new HttpException({ msg_code: 't6', msg: '이미 가입된 계정입니다.' }, 401);
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

  // 유저 로그인 서비스
  async userLogin(userId: string, password: string): Promise<boolean> {
    const userData = await this.membersRepository.findOne({
      where: { userid: userId },
      select: ['userid', 'name', 'password'],
    });
    // 존재하지 않는 계정일 경우
    if (!userData) {
      throw new HttpException({ msg_code: 't2', msg: '등록된 회원이 아닙니다.' }, 400);
    }

    // 패스워드가 일치하지 않는 계정인 경우
    const passwordValidationResult = await bcrypt.compare(password, userData.password);
    if (!passwordValidationResult) {
      throw new HttpException({ msg_code: 't2', msg: '패스워드가 일치하지 않습니다.' }, 400);
    } else {
      return true;
    }
  }

  // 응답 생성 서비스
  responseCreator(message: string, messageCode: string, data?: any) {
    let response: { msg: string; msg_code: string; data?: any } = {
      msg: message,
      msg_code: messageCode,
    };
    if (!!data) {
      response = { ...response, ...data };
    }
    return response;
  }
}
