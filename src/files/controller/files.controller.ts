import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import PublicFile from '../entity/publicFile.entity';
import { FilesService } from '../service/files.service';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File): Promise<PublicFile> {
    return this.filesService.uploadPublicFile(file.buffer, file.originalname);
  }
}
