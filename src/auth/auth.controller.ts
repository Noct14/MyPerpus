import { Controller, Get, Post, Body, Res, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('register')
  @Render('auth/register')
  showRegister() {
    return {};
  }

  @Post('register')
  async register(
    @Body() body: any,
    @Res() res: Response,
  ) {
    try {
      await this.authService.register(body.email, body.password);
      return res.redirect('/auth/login');
    } catch (e) {
      return res.render('auth/register', {
        error: 'Email already used',
      });
    }
  }


  @Get('login')
  @Render('auth/login')
  showLogin() {
    return {};
  }

  @Post('login')
  async login(
    @Body() body: any,
    @Res() res: Response,
  ) {
    try {
      const result = await this.authService.login(body.email, body.password);

      res.cookie('access_token', result.access_token, {
        httpOnly: true,
      });

      return res.redirect('/');
    } catch (e) {
      return res.render('auth/login', {
        error: 'Email atau password salah',
      });
    }
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.redirect('/');
  }
}
