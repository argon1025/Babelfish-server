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

  // Hot-Module
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
  console.log('Server started!!');
}
bootstrap();
