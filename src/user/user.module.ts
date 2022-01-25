import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { UsersController } from './controller/user.controller';
import User from './entity/user.entity';
import { UsersService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FilesModule],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UserModule {}
