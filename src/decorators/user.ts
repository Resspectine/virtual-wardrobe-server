import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import UserEntity from 'src/user/user.entity';

export const UserDecorator = createParamDecorator(
  (_, ctx: ExecutionContext): UserEntity => {
    return ctx.switchToHttp().getRequest().user;
  },
);
