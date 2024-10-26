import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, _res: Response, next: NextFunction) {
    if (req.headers['x-auth-secret'] !== process.env.NEXTAUTH_SECRET) {
      throw new UnauthorizedException('Auth secret not provided or incorrect');
    }

    next();
  }
}