import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocalFile from 'src/files/entity/localFile.entity';
import { FilesController } from './controller/files.controller';
import { FilesService } from './service/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile]), ConfigModule],
  controllers: [FilesController],
  exports: [FilesService],
  providers: [FilesService],
})
export class FilesModule {}
