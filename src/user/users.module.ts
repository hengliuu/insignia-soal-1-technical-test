import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { AuthGuard } from '@nestjs/passport';

@Module({
  controllers: [UsersController],
  providers: [UsersService, WorkspaceService, PrismaService],
})
export class UsersModule {}
