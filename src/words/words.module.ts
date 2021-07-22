import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from '../entities/Word';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/common/Service/JWT.Service';

@Module({
  imports: [TypeOrmModule.forFeature([Word]), ConfigService],
  controllers: [WordsController],
  providers: [WordsService, JwtService],
})
export class WordsModule {}
