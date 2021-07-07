import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenModule } from './token/token.module';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { WordsModule } from './words/words.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/Interceptor/Logging.interceptor';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    TokenModule,
    UsersModule,
    NotesModule,
    WordsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
