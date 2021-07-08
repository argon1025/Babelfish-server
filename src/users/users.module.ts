import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/Member';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
