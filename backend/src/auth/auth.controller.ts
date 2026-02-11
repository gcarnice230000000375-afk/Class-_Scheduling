import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthRequest } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    return this.authService.login(email, password, res);
  }

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('position') position: string,
    @Body('office') office: string,
    @Res() res: Response,
  ) {
    if (
      !email ||
      !password ||
      !first_name ||
      !last_name ||
      !position ||
      !office
    ) {
      throw new BadRequestException('All fields are required');
    }

    return this.authService.register(
      email,
      password,
      first_name,
      last_name,
      position,
      office,
      res,
    );
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    return this.authService.logout(res);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: AuthRequest) {
    return req.user;
  }
}
