import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TagDto } from '../dto/tag.dto';
import { TagService } from '../service/tag.service';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Post('/')
  create(@Body() garment: TagDto): Promise<TagDto> {
    return this.tagService.create(garment);
  }

  @Get('/')
  findAll(): Promise<TagDto[]> {
    return this.tagService.findAll();
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string): Promise<TagDto[]> {
    return this.tagService.deleteById(Number(id));
  }
}
