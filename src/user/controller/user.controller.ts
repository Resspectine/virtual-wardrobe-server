import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { UserDecorator } from 'src/decorators/user';
import User from '../entity/user.entity';
import { UsersService } from '../service/user.service';
import { diskStorage } from 'multer';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploadedFiles',
      }),
    }),
  )
  async addAvatar(
    @UserDecorator() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addAvatar(user.id, file);
  }
}
