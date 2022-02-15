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
import User from 'src/user/user.entity';
import { TagDto } from './tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Post('/')
  @UseGuards(JwtAuthenticationGuard)
  create(@UserDecorator() user: User, @Body() tag: TagDto): Promise<TagDto> {
    return this.tagService.create({ tag: tag, userId: user.id });
  }

  @Get('/')
  @UseGuards(JwtAuthenticationGuard)
  findAll(@UserDecorator() user: User): Promise<TagDto[]> {
    return this.tagService.findAll({ userId: user.id });
  }

  @Delete('/:id')
  @UseGuards(JwtAuthenticationGuard)
  deleteById(
    @UserDecorator() user: User,
    @Param('id') id: string,
  ): Promise<TagDto[]> {
    return this.tagService.deleteById({ id, userId: user.id });
  }
}
