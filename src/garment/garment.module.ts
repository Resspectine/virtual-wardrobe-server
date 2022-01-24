import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/tag/entity/tag.entity';
import { UserModule } from 'src/user/user.module';
import { GarmentController } from './controller/garment.controller';
import { Garment } from './entity/garment.entity';
import { GarmentService } from './service/garment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Garment, Tag]), UserModule],
  controllers: [GarmentController],
  providers: [GarmentService],
})
export class GarmentModule {}
