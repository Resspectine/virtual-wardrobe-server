import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garment } from 'src/garment/garment.entity';
import User from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Garment, User]), UserModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
