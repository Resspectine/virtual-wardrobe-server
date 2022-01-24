import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GarmentDto } from 'src/garment/dto/garment.dto';
import { Tag } from 'src/tag/entity/tag.entity';
import User from 'src/user/entity/user.entity';
import { UsersService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { Garment } from '../entity/garment.entity';
import { queryParamToTableName } from '../helpers';
import {
  GarmentCreate,
  GarmentDeleteGarment,
  GarmentFind,
  GarmentFindAll,
  GarmentFindByTagIds,
  GarmentUpdateGarment,
  GarmentUpdateGarmentFavoriteStatus,
  GarmentUpdateGarmentWearAmount,
} from '../interfaces/service';

@Injectable()
export class GarmentService {
  constructor(
    @InjectRepository(Garment)
    private garmentRepository: Repository<Garment>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    private userService: UsersService,
  ) {}

  async create({ garment, userId }: GarmentCreate): Promise<GarmentDto> {
    const user = await this.userService.getById(userId);
    const repositoryGarment = await this.garmentRepository.create(garment);

    repositoryGarment.tags = await Promise.all(
      repositoryGarment.tags.map(
        async (tag) => await this.tagRepository.save(tag),
      ),
    );

    repositoryGarment.user = user;

    return this.garmentRepository.save(repositoryGarment);
  }

  findAll({
    userId,
    orderBy,
    orderDirection,
  }: GarmentFindAll): Promise<GarmentDto[]> {
    const order: Partial<Record<keyof GarmentDto, 'ASC' | 'DESC'>> = {};

    if (orderBy && orderDirection) {
      order[orderBy] = orderDirection;
    }

    order.createdAt = 'ASC';

    return this.garmentRepository.find({
      where: {
        user: userId,
      },
      relations: ['tags'],
      order,
    });
  }

  findByTagIds({
    ids,
    userId,
    orderBy,
    orderDirection,
  }: GarmentFindByTagIds): Promise<GarmentDto[]> {
    let queryBuilder = this.garmentRepository
      .createQueryBuilder('garment')
      .innerJoin('garment.tags', 'tag')
      .where('tag.id IN (:...ids)', { ids })
      .andWhere('garment.id = (:userId)', { userId: userId });

    if (orderBy && orderDirection && queryParamToTableName[orderBy]) {
      queryBuilder = queryBuilder.orderBy({
        [queryParamToTableName[orderBy]]: orderDirection,
      });
    }

    return queryBuilder.getMany();
  }

  find({
    userId,
    orderBy,
    orderDirection,
    tagIds,
  }: GarmentFind): Promise<GarmentDto[]> {
    const isTagIdsValid = tagIds
      ?.split(',')
      .map(Number)
      .every((value) => !Number.isNaN(value));

    if (!isTagIdsValid) {
      return this.findAll({ userId, orderBy, orderDirection });
    }

    return this.findByTagIds({
      userId,
      ids: tagIds.split(','),
      orderBy,
      orderDirection,
    });
  }

  async updateGarment({ garment, id }: GarmentUpdateGarment) {
    await this.garmentRepository.update(id, garment);

    const updatedGarment = await this.garmentRepository.findOne(id);

    if (updatedGarment) {
      return updatedGarment;
    }

    throw new HttpException('Garment not found', HttpStatus.NOT_FOUND);
  }

  async updateGarmentWearAmount({ id }: GarmentUpdateGarmentWearAmount) {
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

  async updateGarmentFavoriteStatus({
    id,
  }: GarmentUpdateGarmentFavoriteStatus) {
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

  async deleteGarment({ id }: GarmentDeleteGarment) {
    const deleteResponse = await this.garmentRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new HttpException('Garment not found', HttpStatus.NOT_FOUND);
    }

    return this.findAll({ userId: 0 });
  }
}
