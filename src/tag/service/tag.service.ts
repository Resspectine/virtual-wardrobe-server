import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Garment } from 'src/garment/entity/garment.entity';
import { UsersService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { TagDto } from '../dto/tag.dto';
import { Tag } from '../entity/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Garment)
    private garmentRepository: Repository<Garment>,
    private usersService: UsersService,
  ) {}

  async create(tag: TagDto, userId: string): Promise<TagDto> {
    const user = await this.usersService.getById(userId);
    const repositoryTag = await this.tagRepository.create(tag);

    repositoryTag.user = user;

    return this.tagRepository.save(repositoryTag);
  }

  findAll(userId: string): Promise<TagDto[]> {
    return this.tagRepository.find({
      where: {
        user: userId,
      },
    });
  }

  async deleteById(id: string, userId: string): Promise<TagDto[]> {
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
