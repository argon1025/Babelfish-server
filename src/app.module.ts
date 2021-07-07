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
import { TypeOrmModule } from '@nestjs/typeorm';

const ENV = process.env;

@Module({
  imports: [
    TokenModule,
    UsersModule,
    NotesModule,
    WordsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV.NODE_ENV ? '.env' : `.env.${ENV.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: ENV.DB_HOST,
      port: 3306,
      username: ENV.DB_USERNAME,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_DATABASE,
      entities: ['entities/*.js'],
      synchronize: false,
      logging: true,
      keepConnectionAlive: true,
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
