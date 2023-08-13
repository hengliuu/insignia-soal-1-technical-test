import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { UpdateUsersDto } from './users.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  @UseGuards(AuthGuard)
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

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    try {
      const result = await this.userService.getUsersById(id);

      return response.status(200).json({
        status: true,
        message: 'Get Data Successfully!',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Req() request: Request,
    @Res() response: Response,
    @Body() updateUsersDto: UpdateUsersDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const result = await this.userService.updateUsers({
        id: id,
        email: updateUsersDto.email,
        name: updateUsersDto.name,
        workspace_id: updateUsersDto.workspace_id,
      });

      return response.status(200).json({
        statusCode: 200,
        message: 'Update Data Successfully!',
        result: result,
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const result = await this.userService.deleteUsers(id);

      return response.status(200).json({
        statusCode: 200,
        message: 'Delete Data Successfully!',
        result: result,
      });
    } catch (error) {
      throw error;
    }
  }
}
