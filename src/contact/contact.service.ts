import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateContactRequestModel,
  GetContactHeaderResponse,
  UpdateContactRequestModel,
} from './contact.model';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { contact } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly workspaceService: WorkspaceService,
  ) {}

  async createContact(data: CreateContactRequestModel): Promise<Boolean> {
    await this.workspaceService.getWorkspaceById({ id: data.workspace_id });

    const create = await this.prismaService.contact.create({ data });

    if (!create) {
      throw new InternalServerErrorException();
    }

    return true;
  }

  async getAllContact(): Promise<GetContactHeaderResponse[]> {
    const get = await this.prismaService.contact.findMany({
      include: {
        Workspace: true,
        contact_lists: { select: { ContactGroup: true } },
      },
    });

    if (!get) {
      throw new InternalServerErrorException();
    }

    const response = get.map((item) => {
      const contactGroup = item.contact_lists.map(
        (itemContactList) => itemContactList.ContactGroup,
      );

      return {
        id: item.id,
        created_at: item.created_at,
        updated_at: item.updated_at,
        workspace_id: item.workspace_id,
        name: item.name,
        phone_number: item.phone_number,
        email: item.email,
        address: item.address,
        contact_groups: contactGroup,
      };
    });

    return response;
  }

  async getContactById(id: string): Promise<GetContactHeaderResponse> {
    const get = await this.prismaService.contact.findUnique({
      where: { id: id },
      include: { contact_lists: { select: { ContactGroup: true } } },
    });

    if (get === null) {
      throw new NotFoundException('Contact Data Not Found!');
    }

    const contactGroup = get.contact_lists.map((item) => item.ContactGroup);

    const response: GetContactHeaderResponse = {
      id: get.id,
      name: get.name,
      email: get.email,
      address: get.address,
      phone_number: get.phone_number,
      workspace_id: get.workspace_id,
      created_at: get.created_at,
      updated_at: get.updated_at,
      contact_groups: contactGroup,
    };

    return response;
  }

  async updateContact(data: UpdateContactRequestModel): Promise<Boolean> {
    await this.getContactById(data.id);

    await this.workspaceService.getWorkspaceById({ id: data.workspace_id });

    const update = await this.prismaService.contact.update({
      where: { id: data.id },
      data: {
        email: data.email,
        address: data.address,
        updated_at: new Date(),
        phone_number: data.phone_number,
        name: data.name,
        workspace_id: data.workspace_id,
      },
    });

    if (!update) {
      throw new InternalServerErrorException();
    }

    return true;
  }

  async deleteContact(data: { id: string }): Promise<Boolean> {
    await this.getContactById(data.id);

    const deletes = await this.prismaService.contact.delete({
      where: { id: data.id },
    });

    if (!deletes) {
      throw new InternalServerErrorException();
    }

    return true;
  }
}
