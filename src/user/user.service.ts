import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import {
  UserAddAvatar,
  UserCreate,
  UserGetByEmail,
  UserGetById,
  UserUpdate,
} from './interfaces/service';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly filesService: FilesService,
  ) {}

  async getByEmail({ email }: UserGetByEmail) {
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create({ userData }: UserCreate) {
    const newUser = await this.usersRepository.create(userData);

    await this.usersRepository.save(newUser);

    return newUser;
  }

  async update({ userData }: UserUpdate) {
    return this.usersRepository.save(userData);
  }

  async getById({ id }: UserGetById) {
    const user = await this.usersRepository.findOne({
      id,
    });

    if (user) {
      user.password = undefined;

      return user;
    }

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async addAvatar({ file, userId }: UserAddAvatar) {
    const avatar = await this.filesService.saveLocalFile({ file });

    await this.usersRepository.update(userId, {
      avatar,
    });

    return avatar;
  }
}
