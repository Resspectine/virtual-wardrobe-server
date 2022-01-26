import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import LocalFile from '../entity/localFile.entity';
import { LocalFileDto } from '../dto/localFile.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(LocalFile)
    private localFilesRepository: Repository<LocalFile>,
  ) {}

  async getFileById(fileId: string) {
    const file = await this.localFilesRepository.findOne(fileId);
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async saveLocalFile(file: LocalFileDto) {
    const newFile = this.localFilesRepository.create(file);
    await this.localFilesRepository.save(newFile);
    return newFile;
  }
}
