import { LocalFileDto } from 'src/files/localFile.dto';
import { AuthorizedMethod } from 'src/types';
import { CreateUserDto, UpdateUserDto } from '../user.dto';

export interface UserGetByEmail {
  email: string;
}

export interface UserCreate {
  userData: CreateUserDto;
}

export interface UserUpdate {
  userData: UpdateUserDto;
}

export interface UserGetById {
  id: string;
}

export interface UserAddAvatar extends AuthorizedMethod {
  file: LocalFileDto;
}
