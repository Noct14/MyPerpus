import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.access_token;

    if (token) {
      try {
        const user = this.jwtService.verify(token);
        req.user = user;
        res.locals.user = user;
      } catch {
        res.locals.user = null;
      }
    } else {
      res.locals.user = null;
    }

    next();
  }
}
