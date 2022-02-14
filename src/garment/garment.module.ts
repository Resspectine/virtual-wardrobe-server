import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { TagModule } from 'src/tag/tag.module';
import { UserModule } from 'src/user/user.module';
import { GarmentController } from './garment.controller';
import { Garment } from './garment.entity';
import { GarmentService } from './garment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Garment]),
    UserModule,
    FilesModule,
    TagModule,
  ],
  controllers: [GarmentController],
  providers: [GarmentService],
})
export class GarmentModule {}
