import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GarmentDto } from 'src/garment/dto/garment.dto';
import { GarmentService } from 'src/garment/service/garment.service';

@Controller('garment')
export class GarmentController {
  constructor(private garmentService: GarmentService) {}

  @Post('/')
  create(@Body() garment: GarmentDto): Promise<GarmentDto> {
    return this.garmentService.create(garment);
  }

  @Get('/')
  findAll(
    @Query('filter') filter?: string,
    @Query('orderBy') orderBy?: string,
    @Query('orderDirection') orderDirection?: 'ASC' | 'DESC',
  ): Promise<GarmentDto[]> {
    return this.garmentService.find(filter, orderBy, orderDirection);
  }

  @Patch('/:id')
  updateById(
    @Param('id') id: string,
    @Body() garment: GarmentDto,
  ): Promise<GarmentDto> {
    return this.garmentService.updateGarment(Number(id), garment);
  }

  @Patch('/wear/:id')
  wearGarmentById(@Param('id') id: string): Promise<GarmentDto> {
    return this.garmentService.updateGarmentWearAmount(Number(id));
  }

  @Patch('/favorite/:id')
  favoriteGarmentById(@Param('id') id: string): Promise<GarmentDto> {
    return this.garmentService.updateGarmentFavoriteStatus(Number(id));
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string): Promise<GarmentDto[]> {
    return this.garmentService.deleteGarment(Number(id));
  }
}
