import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { UserDecorator } from 'src/decorators/user';
import { GarmentDto } from 'src/garment/garment.dto';
import UserEntity from 'src/user/user.entity';
import { GarmentService } from './garment.service';

@Controller('garment')
export class GarmentController {
  constructor(private garmentService: GarmentService) {}

  @Post('/')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UserDecorator() user: UserEntity,
    @Body() garment: GarmentDto,
  ): Promise<GarmentDto> {
    return this.garmentService.create({ userId: user.id, garment });
  }

  @Get('/')
  @UseGuards(JwtAuthenticationGuard)
  findAll(
    @UserDecorator() user: UserEntity,
    @Query('filter') tagIds?: string,
    @Query('orderBy') orderBy?: string,
    @Query('orderDirection') orderDirection?: 'ASC' | 'DESC',
  ): Promise<GarmentDto[]> {
    return this.garmentService.find({
      userId: user.id,
      tagIds,
      orderBy,
      orderDirection,
    });
  }

  @Patch('/:id')
  @UseGuards(JwtAuthenticationGuard)
  updateById(
    @UserDecorator() user: UserEntity,
    @Param('id') id: string,
    @Body() garment: GarmentDto,
  ): Promise<GarmentDto> {
    return this.garmentService.updateGarment({
      id,
      garment,
      userId: user.id,
    });
  }

  @Patch('/wear/:id')
  @UseGuards(JwtAuthenticationGuard)
  wearGarmentById(
    @UserDecorator() user: UserEntity,
    @Param('id') id: string,
  ): Promise<GarmentDto> {
    return this.garmentService.updateGarmentWearAmount({
      id,
      userId: user.id,
    });
  }

  @Patch('/favorite/:id')
  @UseGuards(JwtAuthenticationGuard)
  favoriteGarmentById(
    @UserDecorator() user: UserEntity,
    @Param('id') id: string,
  ): Promise<GarmentDto> {
    return this.garmentService.updateGarmentFavoriteStatus({
      id,
      userId: user.id,
    });
  }

  @Delete('/:id')
  @UseGuards(JwtAuthenticationGuard)
  deleteById(
    @UserDecorator() user: UserEntity,
    @Param('id') id: string,
  ): Promise<void> {
    return this.garmentService.deleteGarment({
      id,
      userId: user.id,
    });
  }

  @Get('/:id')
  @UseGuards(JwtAuthenticationGuard)
  getById(
    @UserDecorator() user: UserEntity,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<GarmentDto> {
    return this.garmentService.getById({
      id,
      userId: user.id,
    });
  }
}
