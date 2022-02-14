import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        url: process.env.DATABASE_URL,
        type: 'postgres',
        // ssl: {
        //   rejectUnauthorized: false,
        // },
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
