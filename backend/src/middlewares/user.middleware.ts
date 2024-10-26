import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getToken } from 'next-auth/jwt';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(req: Request, _res: Response, next: NextFunction) {
    const token = await getToken({ req });

    if (token?.sub) {
      req.user = {
        id: token.sub,
        name: token.name || null,
        email: token.email || null,
      };

      return next();
    }

    throw new UnauthorizedException('Credentials not provided or incorrect');
  }
}