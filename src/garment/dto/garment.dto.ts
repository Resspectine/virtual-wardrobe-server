import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import LocalFile from 'src/files/entity/localFile.entity';
import { Tag } from 'src/tag/entity/tag.entity';

export class GarmentDto {
  @IsString()
  id: string;

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

  picture?: LocalFile;
}
