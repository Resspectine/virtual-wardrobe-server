import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GarmentDto } from 'src/garment/dto/garment.dto';
import { Tag } from 'src/tag/entity/tag.entity';
import { Repository } from 'typeorm';
import { Garment } from '../entity/garment.entity';
import { queryParamToTableName } from '../helpers';

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

  findAll(
    orderBy?: string,
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<GarmentDto[]> {
    const order: Partial<Record<keyof GarmentDto, 'ASC' | 'DESC'>> = {};

    if (orderBy && orderDirection) {
      order[orderBy] = orderDirection;
    }

    order.createdAt = 'ASC';

    return this.garmentRepository.find({
      relations: ['tags'],
      order,
    });
  }

  findByTagIds(
    ids: string[],
    orderBy?: string,
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<GarmentDto[]> {
    let queryBuilder = this.garmentRepository
      .createQueryBuilder('garment')
      .innerJoin('garment.tags', 'tag')
      .where('tag.id IN (:...ids)', { ids });

    if (orderBy && orderDirection && queryParamToTableName[orderBy]) {
      queryBuilder = queryBuilder.orderBy({
        [queryParamToTableName[orderBy]]: orderDirection,
      });
    }

    return queryBuilder.getMany();
  }

  find(
    tagIds?: string,
    orderBy?: string,
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<GarmentDto[]> {
    const isTagIdsValid = tagIds
      ?.split(',')
      .map(Number)
      .every((value) => !Number.isNaN(value));

    if (!isTagIdsValid) {
      return this.findAll(orderBy, orderDirection);
    }

    return this.findByTagIds(tagIds.split(','), orderBy, orderDirection);
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

  async updateGarmentFavoriteStatus(id: number) {
    const garment = await this.garmentRepository.findOne(id);

    if (!garment) {
      throw new HttpException('Garment not found', HttpStatus.NOT_FOUND);
    }

    await this.garmentRepository.update(id, {
      ...garment,
      isFavorite: !garment.isFavorite,
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

    return this.findAll();
  }
}
