import { Injectable } from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AppService {
  getHomeData(req: Request) {
    return {
      user: req.user || null,
    };
  }
}
