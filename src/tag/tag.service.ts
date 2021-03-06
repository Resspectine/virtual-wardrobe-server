import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Garment } from 'src/garment/garment.entity';
import { UsersService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { TagCreate, TagDeleteById, TagFindAll } from './interfaces/service';
import { TagDto } from './tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Garment)
    private garmentRepository: Repository<Garment>,
    private usersService: UsersService,
  ) {}

  async create({ tag, userId }: TagCreate): Promise<Tag> {
    const existingTag = await this.tagRepository.findOne({
      where: {
        title: tag.title,
        user: userId,
      },
    });

    if (existingTag) {
      return existingTag;
    }

    const user = await this.usersService.getById({ id: userId });
    const repositoryTag = await this.tagRepository.create(tag);

    repositoryTag.user = user;

    return this.tagRepository.save(repositoryTag);
  }

  findAll({ userId }: TagFindAll): Promise<TagDto[]> {
    return this.tagRepository.find({
      where: {
        user: userId,
      },
    });
  }

  async deleteById({ id, userId }: TagDeleteById): Promise<TagDto[]> {
    const tag = await this.tagRepository.findOne(id, {
      relations: ['garments', 'garments.tags'],
      where: {
        user: userId,
      },
    });

    if (!tag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }

    await Promise.all(
      tag.garments.map(async (garment) => {
        garment.tags = garment.tags.filter(({ id: tagId }) => tagId !== id);

        return await this.garmentRepository.save(garment);
      }),
    );

    await this.tagRepository.delete(id);

    return this.tagRepository.find();
  }
}
