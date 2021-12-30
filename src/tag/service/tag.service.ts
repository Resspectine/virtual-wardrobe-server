import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagDto } from '../dto/tag.dto';
import { Tag } from '../entity/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(tag: TagDto): Promise<TagDto> {
    const repositoryTag = await this.tagRepository.create(tag);

    return this.tagRepository.save(repositoryTag);
  }

  findAll(): Promise<TagDto[]> {
    return this.tagRepository.find();
  }

  async deleteById(id: number): Promise<TagDto[]> {
    await this.tagRepository.delete(id);

    return this.tagRepository.find();
  }
}
