import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders:
      'Content-Type,Content-Length,Authorization,Accept,X-Requested-With',
    credentials: true,
    origin: true,
    methods: 'PUT,POST,GET,DELETE,OPTIONS,PATCH',
  });
  app.use(cookieParser());

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
