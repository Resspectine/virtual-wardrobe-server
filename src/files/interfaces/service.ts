import { LocalFileDto } from 'src/files/localFile.dto';

export interface FileGetFileById {
  fileId: string;
}

export interface FileSaveLocalFile {
  file: LocalFileDto;
}
