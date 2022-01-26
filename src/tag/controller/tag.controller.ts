import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { UserDecorator } from 'src/decorators/user';
import User from 'src/user/entity/user.entity';
import { TagDto } from '../dto/tag.dto';
import { TagService } from '../service/tag.service';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Post('/')
  @UseGuards(JwtAuthenticationGuard)
  create(
    @UserDecorator() user: User,
    @Body() garment: TagDto,
  ): Promise<TagDto> {
    return this.tagService.create(garment, user.id);
  }

  @Get('/')
  @UseGuards(JwtAuthenticationGuard)
  findAll(@UserDecorator() user: User): Promise<TagDto[]> {
    return this.tagService.findAll(user.id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthenticationGuard)
  deleteById(
    @UserDecorator() user: User,
    @Param('id') id: string,
  ): Promise<TagDto[]> {
    return this.tagService.deleteById(id, user.id);
  }
}
