import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/user/users.service';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: loginDto): Promise<any> {
    const users = await this.prismaService.users.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!users) {
      throw new NotFoundException('Email Not Found!');
    }

    const checkPassword = await bcrypt.compare(
      loginDto.password,
      users.password,
    );

    if (!checkPassword) {
      throw new BadRequestException("Password Doesn't matched");
    }

    return this.jwtService.sign({ email: users.email });
  }

  async register(registerDto: RegisterDto): Promise<any> {
    const generateId = uuidv4();
    const hashPassword = await bcrypt.hash(registerDto.password, 15);

    const users = await this.usersService.createUsers({
      email: registerDto.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: new Date(),
      lastActivityAt: new Date(),
      name: registerDto.name,
      password: hashPassword,
      workspaceId: registerDto.workspaceId,
      id: generateId,
    });

    return {
      token: this.jwtService.sign({ email: users.email }),
    };
  }
}
