import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garment } from 'src/garment/entity/garment.entity';
import User from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { TagController } from './controller/tag.controller';
import { Tag } from './entity/tag.entity';
import { TagService } from './service/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Garment, User]), UserModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
