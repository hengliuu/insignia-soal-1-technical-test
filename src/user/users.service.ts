import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { users } from '@prisma/client';
import {
  UpdateUsersLastActivityAtRequestModel,
  UpdateUsersRequestModel,
  UpdateUsersResponseModel,
  Users,
} from './users.model';
import { WorkspaceService } from 'src/workspace/workspace.service';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private workspaceService: WorkspaceService,
  ) {}

  async getAllUsers(): Promise<users[]> {
    const get = await this.prismaService.users.findMany({
      include: { Workspace: true },
    });

    return get;
  }

  async getUsersByEmail(email: string): Promise<users> {
    const get = await this.prismaService.users.findUnique({
      where: { email },
      include: { Workspace: true },
    });

    return get;
  }

  async getUsersById(id: string): Promise<users> {
    const get = await this.prismaService.users.findUnique({
      where: { id: id },
    });

    if (!get) {
      throw new NotFoundException('Users Not Found');
    }

    return get;
  }

  async createUsers(data: Users): Promise<users> {
    const validateEmail = await this.getUsersByEmail(data.email);

    if (validateEmail) {
      throw new ConflictException('Email already exists!');
    }

    const getWorkspaceById = await this.workspaceService.getWorkspaceById({
      id: data.workspace_id,
    });

    if (!getWorkspaceById) {
      throw new NotFoundException("Workspace doesn't Exists!");
    }

    return await this.prismaService.users.create({ data });
  }

  async updateUsersLastActivityAt(
    data: UpdateUsersLastActivityAtRequestModel,
  ): Promise<users> {
    const updateLastActivityAt = await this.prismaService.users.update({
      where: { email: data.email },
      data: { last_activity_at: data.last_activity_at },
    });

    if (!updateLastActivityAt) {
      throw new NotFoundException('Email Not Found!');
    }

    return updateLastActivityAt;
  }

  async updateUsers(
    data: UpdateUsersRequestModel,
  ): Promise<UpdateUsersResponseModel> {
    await this.workspaceService.getWorkspaceById({
      id: data.workspace_id,
    });
    await this.getUsersById(data.id);

    const checkEmail = await this.getUsersByEmail(data.email);

    if (checkEmail !== null) {
      throw new BadRequestException('Email already exists!');
    }

    const update = await this.prismaService.users.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
        workspace_id: data.workspace_id,
        updated_at: new Date(),
      },
    });

    if (!update) {
      throw new InternalServerErrorException(update);
    }

    const response = await this.prismaService.users.findUnique({
      select: { id: true, name: true, workspace_id: true, email: true },
      where: { id: data.id },
    });

    return response;
  }

  async deleteUsers(id: string): Promise<Boolean> {
    await this.getUsersById(id);

    const deletes = await this.prismaService.users.delete({
      where: { id: id },
    });

    if (!deletes) {
      throw new InternalServerErrorException();
    }

    return true;
  }
}
