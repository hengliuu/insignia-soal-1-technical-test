import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { PrismaService } from 'src/prisma.service';
import { ContactController } from './contact.controller';

@Module({
  controllers: [ContactController],
  providers: [ContactService, WorkspaceService, PrismaService],
  imports: [],
})
export class ContactModule {}
