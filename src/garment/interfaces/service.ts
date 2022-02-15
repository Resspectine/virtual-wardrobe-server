import { AuthorizedMethod } from 'src/types';
import { GarmentDto } from '../garment.dto';

export interface GarmentCreate extends AuthorizedMethod {
  garment: GarmentDto;
}

export interface GarmentGetById extends AuthorizedMethod {
  id: string;
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
  id: string;
  garment: GarmentDto;
}

export interface GarmentUpdateGarmentWearAmount extends AuthorizedMethod {
  id: string;
}

export interface GarmentUpdateGarmentFavoriteStatus extends AuthorizedMethod {
  id: string;
}

export interface GarmentDeleteGarment extends AuthorizedMethod {
  id: string;
}
