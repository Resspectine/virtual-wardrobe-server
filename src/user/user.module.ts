import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { UsersController } from './user.controller';
import User from './user.entity';
import { UsersService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FilesModule],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UserModule {}
