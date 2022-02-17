import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import LocalFile from 'src/files/localFile.entity';
import { Tag } from 'src/tag/tag.entity';

export class GarmentDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0, {
    message: 'Price should be greater then 0',
  })
  price: string;

  wearingAmount: number;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  picture?: LocalFile;
}
