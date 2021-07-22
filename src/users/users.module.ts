import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/Member';
import { JwtService } from 'src/common/Service/JWT.Service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), ConfigService],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
