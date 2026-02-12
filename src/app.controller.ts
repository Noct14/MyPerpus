import { Controller, Get, Req, UseGuards, Render } from '@nestjs/common';
import { OptionalAuthGuard } from './auth/optional-auth.guard';
import type { Request } from 'express';

@Controller()
export class AppController {

  @UseGuards(OptionalAuthGuard)
  @Get()
  @Render('home')
  home(@Req() req: Request) {
    return {
      user: req.user || null,
    };
  }
}
