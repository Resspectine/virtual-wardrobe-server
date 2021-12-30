import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GarmentDto } from 'src/garment/dto/garment.dto';
import { Tag } from 'src/tag/entity/tag.entity';
import { Repository } from 'typeorm';
import { Garment } from '../entity/garment.entity';

@Injectable()
export class GarmentService {
  constructor(
    @InjectRepository(Garment)
    private garmentRepository: Repository<Garment>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(garment: GarmentDto): Promise<GarmentDto> {
    const repositoryGarment = await this.garmentRepository.create(garment);

    repositoryGarment.tags = await Promise.all(
      repositoryGarment.tags.map(
        async (tag) => await this.tagRepository.save(tag),
      ),
    );

    return this.garmentRepository.save(repositoryGarment);
  }

  findAll(): Promise<GarmentDto[]> {
    return this.garmentRepository.find({
      relations: ['tags'],
    });
  }

  async updateGarment(id: number, garment: GarmentDto) {
    await this.garmentRepository.update(id, garment);
    const updatedGarment = await this.garmentRepository.findOne(id);
    if (updatedGarment) {
      return updatedGarment;
    }
    throw new HttpException('Garment not found', HttpStatus.NOT_FOUND);
  }

  async updateGarmentWearAmount(id: number) {
    const garment = await this.garmentRepository.findOne(id);

    if (!garment) {
      throw new HttpException('Garment not found', HttpStatus.NOT_FOUND);
    }

    await this.garmentRepository.update(id, {
      ...garment,
      wearingAmount: garment.wearingAmount + 1,
    });

    const updatedGarment = await this.garmentRepository.findOne(id);
    if (updatedGarment) {
      return updatedGarment;
    }
    throw new HttpException('Garment not found', HttpStatus.NOT_FOUND);
  }

  async deleteGarment(id: number) {
    const deleteResponse = await this.garmentRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Garment not found', HttpStatus.NOT_FOUND);
    }

    return this.garmentRepository.find();
  }
}
