import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { Request, Response } from 'express';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from './workspace.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('workspace')
export class WorkspaceController {
  constructor(public readonly workspaceService: WorkspaceService) {}

  @Get('')
  @UseGuards(AuthGuard)
  async getAll(@Res() response: Response) {
    try {
      const result = await this.workspaceService.getAllWorkspace();

      return response.status(200).json({
        statusCode: 200,
        message: 'Get Data Successfully!',
        result: result,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getById(
    @Res() response: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const result = await this.workspaceService.getWorkspaceById({ id: id });

      return response.status(200).json({
        statusCode: 200,
        message: 'Get Data Successfully!',
        result: result,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('')
  // @UseGuards(AuthGuard)
  async create(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ) {
    try {
      const result = await this.workspaceService.createWorkspace(
        createWorkspaceDto,
      );

      return response.status(200).json({
        statusCode: 200,
        message: 'Insert Data Successfully!',
        result: result,
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
    @Body() updateorkspaceDto: UpdateWorkspaceDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const result = await this.workspaceService.updateWorkspace({
        id: id,
        name: updateorkspaceDto.name,
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
      const result = await this.workspaceService.deleteWorkspace({
        id: id,
      });

      return response.status(200).json({
        statusCode: 200,
        message: 'Deleted Data Successfully!',
        result: result,
      });
    } catch (error) {
      throw error;
    }
  }
}
