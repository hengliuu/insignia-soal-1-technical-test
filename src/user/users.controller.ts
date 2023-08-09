import { Controller, Get, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Exceptions } from 'src/exceptions';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly exceptions: Exceptions,
  ) {}

  @Get('')
  async getAllUser(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.userService.getAllUsers();

      return response.status(200).json({
        status: true,
        message: 'Get Data Successfully!',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
}
