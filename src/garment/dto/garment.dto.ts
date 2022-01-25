import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import PublicFile from 'src/files/entity/publicFile.entity';
import { Tag } from 'src/tag/entity/tag.entity';

export class GarmentDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  price: string;

  @IsNumber()
  wearingAmount: number;

  @IsBoolean()
  isFavorite: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  tags: Tag[];

  picture?: PublicFile;
}
