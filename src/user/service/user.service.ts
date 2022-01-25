import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/service/files.service';
import { Repository } from 'typeorm';
import CreateUserDto, { UpdateUserDto } from '../dto/user.dto';
import User from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly filesService: FilesService,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(userData: UpdateUserDto) {
    return this.usersRepository.save(userData);
  }

  async getById(id: number) {
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

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    // const user = await this.getById(userId);
    await this.usersRepository.update(userId, {
      avatar,
    });
    return avatar;
  }
}
