import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(data: User): Promise<User> {
    // const saltOrRounds = 10;
    // const password = 'random_password';
    // const hash = await bcrypt.hash(password, saltOrRounds);

    const create = this.prisma.user.create({ data });

    return create;
  }

  async getUserById(id: number): Promise<User | null> {
    return;
  }
}
