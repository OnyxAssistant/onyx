import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '@/api/auth/auth.d';

export const User = createParamDecorator(
  (data: keyof AuthUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
  },
);
