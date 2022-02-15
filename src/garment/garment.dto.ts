import LocalFile from 'src/files/localFile.entity';
import { Tag } from 'src/tag/tag.entity';

export class GarmentDto {
  id: string;
  title: string;
  description: string;
  price: string;
  wearingAmount: number;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  picture?: LocalFile;
}
