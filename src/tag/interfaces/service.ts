import { AuthorizedMethod } from 'src/types';
import { TagDto } from '../tag.dto';

export interface TagCreate extends AuthorizedMethod {
  tag: TagDto;
}

export interface TagDeleteById extends AuthorizedMethod {
  id: string;
}

export type TagFindAll = AuthorizedMethod;
