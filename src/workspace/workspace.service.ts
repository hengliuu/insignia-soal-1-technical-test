import { NotFoundException } from '@nestjs/common';
import { workspace } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

export class WorkspaceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getWorkspaceById(data: { id: string }): Promise<workspace> {
    const getWorkspaceById = await this.prismaService.workspace.findUnique({
      where: { id: data.id },
    });

    if (!getWorkspaceById) {
      throw new NotFoundException('Workspace Data Not Found!');
    }

    return getWorkspaceById;
  }

  async createWorkspace(data: workspace): Promise<Boolean> {
    const createWorkspace = await this.prismaService.workspace.create({ data });

    return true;
  }

  //   async updateWorkspace(data: Workspace): Promise<Boolean> {
  //     const check
  //   }
}
