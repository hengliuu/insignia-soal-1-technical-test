import { Prisma } from '@prisma/client';

export class Users implements Prisma.usersCreateInput {
  id: Buffer;
  created_at: string | Date;
  updated_at?: string | Date;
  last_activity_at: string | Date;
  email: string;
  email_verified: string | Date;
  name: string;
  password: string;
  Workspace: Prisma.workspaceCreateNestedOneWithoutUsersInput;
}
