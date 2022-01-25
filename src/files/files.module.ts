import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import PublicFile from 'src/files/entity/publicFile.entity';
import { FilesController } from './controller/files.controller';
import { FilesService } from './service/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile]), ConfigModule],
  controllers: [FilesController],
  exports: [FilesService],
  providers: [FilesService],
})
export class FilesModule {}
