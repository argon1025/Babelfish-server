import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/Member';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [TokenController],
  providers: [TokenService, UsersService],
})
export class TokenModule {}
