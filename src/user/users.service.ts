import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(): Promise<Users[]> {
    const get = this.prismaService.users.findMany();

    return get;
  }

  async getUsersByEmail(data: { email: string }): Promise<Users> {
    const get = await this.prismaService.users.findUnique({
      where: { email: data.email },
    });

    return get;
  }

  async createUsers(data: Users): Promise<Users> {
    const validateEmail = await this.getUsersByEmail({ email: data.email });

    if (validateEmail) {
      throw new ConflictException('Email already exists!');
    }

    return this.prismaService.users.create({ data });
  }
}
