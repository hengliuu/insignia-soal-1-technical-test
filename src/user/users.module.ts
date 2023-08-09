import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Exceptions } from 'src/exceptions';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, Exceptions],
})
export class UsersModule {}
