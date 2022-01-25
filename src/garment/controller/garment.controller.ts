import {
  Body,
  Controller,
  createParamDecorator,
  Delete,
  ExecutionContext,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { GarmentDto } from 'src/garment/dto/garment.dto';
import { GarmentService } from 'src/garment/service/garment.service';
import UserEntity from 'src/user/entity/user.entity';

export const User = createParamDecorator(
  (_, ctx: ExecutionContext): UserEntity => {
    return ctx.switchToHttp().getRequest().user;
  },
);

@Controller('garment')
export class GarmentController {
  constructor(private garmentService: GarmentService) {}

  @Post('/')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @User() user: UserEntity,
    @Body() garment: GarmentDto,
  ): Promise<GarmentDto> {
    return this.garmentService.create({ userId: user.id, garment });
  }

  @Get('/')
  @UseGuards(JwtAuthenticationGuard)
  findAll(
    @User() user: UserEntity,
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
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() garment: GarmentDto,
  ): Promise<GarmentDto> {
    return this.garmentService.updateGarment({
      id: Number(id),
      garment,
      userId: user.id,
    });
  }

  @Patch('/wear/:id')
  @UseGuards(JwtAuthenticationGuard)
  wearGarmentById(
    @User() user: UserEntity,
    @Param('id') id: string,
  ): Promise<GarmentDto> {
    return this.garmentService.updateGarmentWearAmount({
      id: Number(id),
      userId: user.id,
    });
  }

  @Patch('/favorite/:id')
  @UseGuards(JwtAuthenticationGuard)
  favoriteGarmentById(
    @User() user: UserEntity,
    @Param('id') id: string,
  ): Promise<GarmentDto> {
    return this.garmentService.updateGarmentFavoriteStatus({
      id: Number(id),
      userId: user.id,
    });
  }

  @Delete('/:id')
  @UseGuards(JwtAuthenticationGuard)
  deleteById(@User() user: UserEntity, @Param('id') id: string): Promise<void> {
    return this.garmentService.deleteGarment({
      id: Number(id),
      userId: user.id,
    });
  }

  @Get('/:id')
  @UseGuards(JwtAuthenticationGuard)
  getById(
    @User() user: UserEntity,
    @Param('id') id: string,
  ): Promise<GarmentDto> {
    return this.garmentService.getById({
      id: Number(id),
      userId: user.id,
    });
  }
}
