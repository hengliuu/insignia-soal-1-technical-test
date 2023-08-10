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
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ContactGroupService } from './contact-group.service';
import {
  CreateContactGroupDto,
  UpdateContactGroupDto,
} from './contact-group.dto';

@Controller('contact-group')
export class ContactGroupController {
  constructor(private readonly contactGroupService: ContactGroupService) {}

  @Get('')
  @UseGuards(AuthGuard)
  async getAll(@Res() response: Response) {
    try {
      const result = await this.contactGroupService.getAllGroupContact();

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
      const result = await this.contactGroupService.getGroupContactById(id);

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
  @UseGuards(AuthGuard)
  async create(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createContactGroupDto: CreateContactGroupDto,
  ) {
    try {
      const result = await this.contactGroupService.createContactGroup(
        createContactGroupDto,
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
    @Body() updateContactGroupDto: UpdateContactGroupDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const result = await this.contactGroupService.updateContactGroup({
        id: id,
        name: updateContactGroupDto.name,
        description: updateContactGroupDto.description,
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
      const result = await this.contactGroupService.deleteContactGroup({ id });

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
