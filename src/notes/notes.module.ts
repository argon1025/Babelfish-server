import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '../entities/Note';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/common/Service/JWT.Service';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), ConfigService],
  controllers: [NotesController],
  providers: [NotesService, JwtService],
})
export class NotesModule {}
