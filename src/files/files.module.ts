import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocalFile from 'src/files/localFile.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile]), ConfigModule],
  controllers: [FilesController],
  exports: [FilesService],
  providers: [FilesService],
})
export class FilesModule {}
