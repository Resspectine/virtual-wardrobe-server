import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/service/files.service';
import { GarmentDto } from 'src/garment/dto/garment.dto';
import { Tag } from 'src/tag/entity/tag.entity';
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
  GarmentGetById,
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
    private fileService: FilesService,
  ) {}

  async create({ garment, userId }: GarmentCreate): Promise<GarmentDto> {
    const user = await this.userService.getById(userId);
    const repositoryGarment = await this.garmentRepository.create(garment);

    repositoryGarment.tags = await Promise.all(
      repositoryGarment.tags?.map(
        async (tag) => await this.tagRepository.save(tag),
      ) || [],
    );

    repositoryGarment.user = user;

    return this.garmentRepository.save(repositoryGarment);
  }

  async getById({ id, userId }: GarmentGetById): Promise<GarmentDto> {
    return this.garmentRepository.findOne(id, {
      where: {
        user: userId,
      },
      relations: ['tags'],
    });
  }

  findAll({
    userId,
    orderBy,
    orderDirection,
  }: GarmentFindAll): Promise<GarmentDto[]> {
    let queryBuilder = this.garmentRepository
      .createQueryBuilder('garment')
      .leftJoinAndSelect('garment.tags', 'tags')
      .orderBy('tags.created_at', 'ASC')
      .orderBy('garment.created_at', 'ASC')
      .leftJoinAndSelect('garment.picture', 'picture')
      .innerJoin('garment.user', 'user')
      .andWhere('user.id = (:userId)', { userId: userId });

    if (orderBy && orderDirection && queryParamToTableName[orderBy]) {
      queryBuilder = queryBuilder.orderBy({
        [queryParamToTableName[orderBy]]: orderDirection,
      });
    }

    return queryBuilder.getMany();
  }

  findByTagIds({
    ids,
    userId,
    orderBy,
    orderDirection,
  }: GarmentFindByTagIds): Promise<GarmentDto[]> {
    let queryBuilder = this.garmentRepository
      .createQueryBuilder('garment')
      .leftJoin('garment.tags', 'tag')
      .where('tag.id IN (:...ids)', { ids })
      .leftJoinAndSelect('garment.tags', 'tags')
      .orderBy('tags.created_at', 'ASC')
      .orderBy('garment.created_at', 'ASC')
      .leftJoinAndSelect('garment.picture', 'picture')
      .innerJoin('garment.user', 'user')
      .andWhere('user.id = (:userId)', { userId: userId });

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
    garment.tags = await Promise.all(
      garment.tags?.map(async (tag) => await this.tagRepository.save(tag)) ||
        [],
    );

    await this.garmentRepository.save(garment);

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

    return;
  }
}
