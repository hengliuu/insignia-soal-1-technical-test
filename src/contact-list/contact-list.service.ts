import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ContactGroupService } from 'src/contact-group/contact-group.service';
import { ContactService } from 'src/contact/contact.service';
import { PrismaService } from 'src/prisma.service';
import {
  CreateContactListRequestModel,
  UpdateContactListRequestModel,
} from './contact-list.model';
import { contact_list } from '@prisma/client';

@Injectable()
export class ContactListService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly contactGroupService: ContactGroupService,
    private readonly contactService: ContactService,
  ) {}

  async createContactList(
    data: CreateContactListRequestModel,
  ): Promise<Boolean> {
    await this.contactService.getContactById(data.contact_id);

    await this.contactGroupService.getGroupContactById(data.contact_group_id);

    const create = await this.prismaService.contact_list.create({ data });

    if (!create) {
      throw new InternalServerErrorException();
    }

    return true;
  }

  async getAllContactList(): Promise<contact_list[]> {
    const get = await this.prismaService.contact_list.findMany({
      include: { Contact: true, ContactGroup: true },
    });

    if (!get) {
      throw new InternalServerErrorException();
    }

    return get;
  }

  async getContactListById(id: string): Promise<contact_list> {
    const get = await this.prismaService.contact_list.findUnique({
      where: { id: id },
      include: { Contact: true, ContactGroup: true },
    });

    if (!get) {
      throw new NotFoundException('Contact List Data Not Found!');
    }

    return get;
  }

  async updateContactList(
    data: UpdateContactListRequestModel,
  ): Promise<Boolean> {
    await this.contactService.getContactById(data.contact_id);

    await this.contactGroupService.getGroupContactById(data.contact_group_id);

    const update = await this.prismaService.contact_list.update({
      where: { id: data.id },
      data,
    });

    if (!update) {
      throw new InternalServerErrorException();
    }

    return true;
  }

  async deleteContactList(id: string): Promise<Boolean> {
    await this.getContactListById(id);

    const deletes = await this.prismaService.contact_list.delete({
      where: { id: id },
    });

    if (!deletes) {
      throw new InternalServerErrorException();
    }

    return true;
  }
}
