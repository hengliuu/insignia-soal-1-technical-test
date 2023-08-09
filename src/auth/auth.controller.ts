import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { Exceptions } from 'src/exceptions';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly exceptions: Exceptions,
  ) {}

  @Post('/login')
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginDto: loginDto,
  ): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);

      return response.status(200).json({
        status: true,
        message: 'Insert Data Successfully!',
        token: result,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('/register')
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerDto: RegisterDto,
  ): Promise<any> {
    try {
      const result = await this.authService.register(registerDto);

      return response.status(200).json({
        status: true,
        message: 'Register Data Successfully!',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
}