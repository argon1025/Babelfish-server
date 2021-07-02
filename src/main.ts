import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Hot-Module
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // Hot-Module
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  console.log('Server started!!');
}
bootstrap();
