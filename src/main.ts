import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// Hot-Module
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Babelfish')
    .setDescription('Babelfish API description')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);

  // Configuration Load
  const configService = app.get<ConfigService>(ConfigService);
  const SERVER_PORT = configService.get<number>('SERVER_PORT', 8080);
  const SERVER_ENV = configService.get<string>('NODE_ENV', 'production');
  const SERVER_HOST = configService.get<string>('SERVER_HOST', 'localhost');


  // Hot-Module
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(SERVER_PORT);
  console.log(`${SERVER_ENV} server http://${SERVER_HOST}:${SERVER_PORT}`);

}
bootstrap();
