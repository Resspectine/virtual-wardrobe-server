import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: process.env.DATABASE_URL,
        type: 'postgres',
        ssl: {
          rejectUnauthorized: false,
        },
        // host: configService.get('POSTGRES_HOST'),
        // port: configService.get('POSTGRES_PORT'),
        // username: configService.get('POSTGRES_USER'),
        // password: configService.get('POSTGRES_PASSWORD'),
        // database: configService.get('POSTGRES_DB'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
