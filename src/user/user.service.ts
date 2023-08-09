import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { RegisterRequest } from './model/user.model';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(request: RegisterRequest): Promise<User> {
    const create = this.prisma.user.create({
      data: { name: request.name, email: request.email },
    });

    return create;
  }
}
