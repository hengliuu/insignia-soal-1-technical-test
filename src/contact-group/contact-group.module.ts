import { Module } from '@nestjs/common';
import { ContactGroupService } from './contact-group.service';
import { PrismaService } from 'src/prisma.service';
import { ContactGroupController } from './contact-group.controller';

@Module({
  providers: [ContactGroupService, PrismaService],
  controllers: [ContactGroupController],
})
export class ContactGroupModule {}
