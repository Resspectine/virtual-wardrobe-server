import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import LocalFile from '../entity/localFile.entity';
import { FilesService } from '../service/files.service';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploadedFiles',
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File): Promise<LocalFile> {
    return this.filesService.saveLocalFile(file);
  }

  @Get(':id')
  async getDatabaseFileById(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.filesService.getFileById(id);

    const stream = createReadStream(join(process.cwd(), file.path));

    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    });

    await new Promise((resolve, reject) =>
      stream
        .on('error', () => {
          reject(new HttpException('File not found', HttpStatus.NOT_FOUND));
        })
        .on('readable', resolve),
    );

    return new StreamableFile(createReadStream(join(process.cwd(), file.path)));
  }
}
