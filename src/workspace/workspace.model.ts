import { Prisma } from '@prisma/client';

export class Workspace implements Prisma.workspaceCreateInput {
  id?: string;
  name: string;
  users?: Prisma.usersCreateNestedManyWithoutWorkspaceInput;
  contacts?: Prisma.contactCreateNestedManyWithoutWorkspaceInput;
}
