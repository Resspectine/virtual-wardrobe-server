import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Garment } from 'src/garment/entity/garment.entity';
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
  ) {}

  async create(tag: TagDto): Promise<TagDto> {
    const repositoryTag = await this.tagRepository.create(tag);

    return this.tagRepository.save(repositoryTag);
  }

  findAll(): Promise<TagDto[]> {
    return this.tagRepository.find();
  }

  async deleteById(id: number): Promise<TagDto[]> {
    const tag = await this.tagRepository.findOne(id, {
      relations: ['garments', 'garments.tags'],
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
