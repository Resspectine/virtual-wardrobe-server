import { GarmentDto } from '../dto/garment.dto';

export interface AuthorizedMethod {
  userId: number;
}

export interface GarmentCreate extends AuthorizedMethod {
  garment: GarmentDto;
}

export interface GarmentFindAll extends AuthorizedMethod {
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export interface GarmentFindByTagIds extends AuthorizedMethod {
  ids: string[];
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export interface GarmentFind extends AuthorizedMethod {
  tagIds?: string;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export interface GarmentUpdateGarment extends AuthorizedMethod {
  id: number;
  garment: GarmentDto;
}

export interface GarmentUpdateGarmentWearAmount extends AuthorizedMethod {
  id: number;
}

export interface GarmentUpdateGarmentFavoriteStatus extends AuthorizedMethod {
  id: number;
}

export interface GarmentDeleteGarment extends AuthorizedMethod {
  id: number;
}
