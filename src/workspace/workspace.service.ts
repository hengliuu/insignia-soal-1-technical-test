import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { workspace } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateWorkspaceModel, UpdateWorkspaceModel } from './workspace.model';

@Injectable()
export class WorkspaceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getWorkspaceById(data: { id: string }): Promise<workspace> {
    const getWorkspaceById = await this.prismaService.workspace.findUnique({
      where: { id: data.id },
    });

    if (getWorkspaceById === null) {
      throw new NotFoundException('Workspace Data Not Found!');
    }

    return getWorkspaceById;
  }

  async getAllWorkspace(): Promise<workspace[]> {
    const res = await this.prismaService.workspace.findMany();

    return res;
  }

  async createWorkspace(data: CreateWorkspaceModel): Promise<Boolean> {
    const create = await this.prismaService.workspace.create({
      data,
    });

    if (!create) {
      throw new InternalServerErrorException();
    }

    return true;
  }

  async updateWorkspace(data: UpdateWorkspaceModel): Promise<Boolean> {
    await this.getWorkspaceById({ id: data.id });

    const update = await this.prismaService.workspace.update({
      where: { id: data.id },
      data,
    });

    if (!update) {
      throw new InternalServerErrorException();
    }

    return true;
  }

  async deleteWorkspace(data: { id: string }): Promise<string> {
    await this.getWorkspaceById({ id: data.id });

    const deletes = await this.prismaService.workspace.delete({ where: data });

    if (!deletes) {
      throw new InternalServerErrorException();
    }

    return 'Delete Data Successfully!';
  }
}
