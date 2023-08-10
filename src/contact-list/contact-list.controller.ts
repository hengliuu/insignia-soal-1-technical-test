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
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ContactListService } from './contact-list.service';
import { CreateContactListDto } from './contact-list.dto';
import { UpdateContactListRequestModel } from './contact-list.model';

@Controller('contact-list')
export class ContactListController {
  constructor(private readonly contactListService: ContactListService) {}

  @Get('')
  @UseGuards(AuthGuard)
  async getAll(@Res() response: Response) {
    try {
      const result = await this.contactListService.getAllContactList();

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
      const result = await this.contactListService.getContactListById(id);

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
    @Body() createContactListDto: CreateContactListDto,
  ) {
    try {
      const result = await this.contactListService.createContactList(
        createContactListDto,
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
    @Body() updateContactListRequestModel: UpdateContactListRequestModel,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const result = await this.contactListService.updateContactList({
        id: id,
        contact_id: updateContactListRequestModel.contact_id,
        contact_group_id: updateContactListRequestModel.contact_group_id,
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
      const result = await this.contactListService.deleteContactList(id);

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
