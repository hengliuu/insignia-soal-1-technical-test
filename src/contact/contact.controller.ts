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
import { ContactService } from './contact.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateContactDto, UpdateContactDto } from './contact.dto';
import { Response } from 'express';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('')
  @UseGuards(AuthGuard)
  async getAll(@Res() response: Response) {
    try {
      const result = await this.contactService.getAllContact();

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
      const result = await this.contactService.getContactById(id);

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
    @Body() createContactDto: CreateContactDto,
  ) {
    try {
      const result = await this.contactService.createContact(createContactDto);

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
    @Body() updateContactDto: UpdateContactDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const result = await this.contactService.updateContact({
        id: id,
        address: updateContactDto.address,
        email: updateContactDto.email,
        name: updateContactDto.name,
        phone_number: updateContactDto.phone_number,
        workspace_id: updateContactDto.workspace_id,
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
      const result = await this.contactService.deleteContact({ id });

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
