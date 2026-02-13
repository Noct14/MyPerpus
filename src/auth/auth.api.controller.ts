import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import type { Response, Request } from 'express';

@Controller('api')
export class AuthApiController {
  constructor(private authService: AuthService) {}

  // REGISTER
  @Public()
  @Post('register')
  async register(@Body() body: any) {
    await this.authService.register(body.email, body.password);

    return {
      message: 'User registered successfully',
    };
  }

  // LOGIN
  @Public()
  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    const result = await this.authService.login(
      body.email,
      body.password,
    );

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
    });

    return res.json({
      message: 'Login successful',
      access_token: result.access_token,
    });
  }

  // LOGOUT
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');

    return res.json({
      message: 'Logout successful',
    });
  }
}
