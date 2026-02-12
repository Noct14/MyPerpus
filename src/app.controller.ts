import { Controller, Get, Req, UseGuards, Render } from '@nestjs/common';
import { OptionalAuthGuard } from './auth/optional-auth.guard';
import { AppService } from './app.service';
import type { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(OptionalAuthGuard)
  @Get()
  @Render('home')
  home(@Req() req: Request) {
    return this.appService.getHomeData(req);
  }
}
