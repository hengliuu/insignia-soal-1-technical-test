import { Prisma } from '@prisma/client';

export class Users implements Prisma.UsersCreateInput {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  lastActivityAt: Date;
  email: string;
  emailVerified: Date;
  name: string;
  password: string;
  workspaceId: string;
  workspace: Prisma.WorkspaceCreateNestedOneWithoutUsersInput;
}
