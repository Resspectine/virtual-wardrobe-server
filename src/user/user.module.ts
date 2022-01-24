import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entity/user.entity';
import { UsersService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  exports: [UsersService],
  providers: [UsersService],
})
export class UserModule {}
