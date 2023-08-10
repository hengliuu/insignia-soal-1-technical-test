import { Module } from '@nestjs/common';
import { ContactListService } from './contact-list.service';
import { PrismaService } from 'src/prisma.service';
import { ContactListController } from './contact-list.controller';
import { ContactGroupService } from 'src/contact-group/contact-group.service';
import { ContactService } from 'src/contact/contact.service';
import { WorkspaceService } from 'src/workspace/workspace.service';

@Module({
  providers: [
    ContactListService,
    PrismaService,
    ContactGroupService,
    ContactService,
    WorkspaceService,
  ],
  controllers: [ContactListController],
})
export class ContactListModule {}
