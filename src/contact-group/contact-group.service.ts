import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateContactGroupRequestModal,
  GetGroupContactHeaderResponse,
  UpdateContactGroupRequestModal,
} from './contact-group.model';

@Injectable()
export class ContactGroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async createContactGroup(
    data: CreateContactGroupRequestModal,
  ): Promise<Boolean> {
    const create = await this.prismaService.contact_group.create({ data });

    if (!create) {
      throw new InternalServerErrorException();
    }

    return true;
  }

  async getAllGroupContact(): Promise<GetGroupContactHeaderResponse[]> {
    const get = await this.prismaService.contact_group.findMany({
      include: { contact_lists: { select: { Contact: true } } },
    });

    if (!get) {
      throw new InternalServerErrorException();
    }

    const response = get.map((item) => {
      const contact = item.contact_lists.map((item) => item.Contact);

      return {
        id: item.id,
        name: item.name,
        description: item.description,
        created_at: item.created_at,
        updated_at: item.updated_at,
        contacts: contact,
      };
    });

    return response;
  }

  async getGroupContactById(
    id: string,
  ): Promise<GetGroupContactHeaderResponse> {
    const get = await this.prismaService.contact_group.findUnique({
      where: { id: id },
      include: { contact_lists: { select: { Contact: true } } },
    });

    if (!get) {
      throw new NotFoundException('Contact Group List Not Found!');
    }

    const contact = get.contact_lists.map((item) => item.Contact);

    const response: GetGroupContactHeaderResponse = {
      ...get,
      contacts: contact,
    };

    return response;
  }

  async updateContactGroup(
    data: UpdateContactGroupRequestModal,
  ): Promise<Boolean> {
    await this.getGroupContactById(data.id);

    const update = await this.prismaService.contact_group.update({
      where: { id: data.id },
      data,
    });

    if (!update) {
      throw new InternalServerErrorException();
    }

    return true;
  }

  async deleteContactGroup(data: { id: string }): Promise<Boolean> {
    await this.getGroupContactById(data.id);

    const deletes = await this.prismaService.contact_group.delete({
      where: { id: data.id },
    });

    if (!deletes) {
      throw new InternalServerErrorException();
    }

    return true;
  }
}
