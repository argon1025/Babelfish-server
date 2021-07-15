import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '../entities/Note';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
