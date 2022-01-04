import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garment } from 'src/garment/entity/garment.entity';
import { TagController } from './controller/tag.controller';
import { Tag } from './entity/tag.entity';
import { TagService } from './service/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Garment])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
