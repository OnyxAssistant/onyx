import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 5000);
  console.log('Core gateway is running on port', process.env.PORT ?? 5000);
}
bootstrap();
