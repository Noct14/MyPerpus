import { Controller, Get, Req, Render } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  home(@Req() req: Request) {
    return this.appService.getHomeData(req);
  }
}
