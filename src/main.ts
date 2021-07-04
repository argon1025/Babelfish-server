import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Hot-Module
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration Load
  const configService = app.get<ConfigService>(ConfigService);
  const SERVER_PORT = configService.get<number>('SERVER_PORT', 8080);
  const SERVER_ENV = configService.get<string>('NODE_ENV', 'production');
  const SERVER_HOST = configService.get<string>('SERVER_HOST', 'localhost');

  await app.listen(SERVER_PORT);

  // Hot-Module
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(`${SERVER_ENV} server http://${SERVER_HOST}:${SERVER_PORT}`);
}
bootstrap();
