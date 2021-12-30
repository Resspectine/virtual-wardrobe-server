import { IsBoolean, IsNumber, IsString } from 'class-validator';
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

  @IsString()
  imageUrl: string;

  @IsNumber()
  wearingAmount: number;

  @IsBoolean()
  isFavorite: boolean;

  tags: Tag[];
}
