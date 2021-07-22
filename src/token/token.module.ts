import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/Member';
import { JwtService } from '../common/Service/JWT.Service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), ConfigService],
  controllers: [TokenController],
  providers: [TokenService, UsersService, JwtService],
})
export class TokenModule {}
