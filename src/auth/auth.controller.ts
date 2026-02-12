import { Controller, Get, Post, Body, Res, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import type { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('register')
  @Render('auth/register')
  showRegister() {
    return {
      layout: 'auth-layout',
      title: 'Register',
    };
  }

  @Public()
  @Post('register')
  async register(
    @Body() body: any,
    @Res() res: Response,
  ) {
    try {
      await this.authService.register(body.email, body.password);
      return res.redirect('/login');
    } catch (e) {
      return res.render('auth/register', {
        layout: 'auth-layout',
        title: 'Register',
        error: 'Email already used',
      });
    }
  }

  @Public()
  @Get('login')
  @Render('auth/login')
  showLogin() {
    return {
      layout: 'auth-layout',
      title: 'Login',
    };
  }

  @Public()
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
        layout: 'auth-layout',
        title: 'Login',
        error: 'Email atau password salah',
      });
    }
  }

  @Public()
  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.redirect('/login');
  }
}
