import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

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

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
