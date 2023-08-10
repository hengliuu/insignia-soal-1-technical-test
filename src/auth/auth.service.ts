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
import { WorkspaceService } from 'src/workspace/workspace.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly workspaceService: WorkspaceService,
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

    const updateUsersLastActivityAt =
      await this.usersService.updateUsersLastActivityAt({
        email: loginDto.email,
        last_activity_at: new Date(),
      });

    if (!updateUsersLastActivityAt) {
      throw new InternalServerErrorException();
    }

    return await this.jwtService.signAsync({ email: users.email });
  }

  async register(registerDto: RegisterDto): Promise<any> {
    const hashPassword = await bcrypt.hash(registerDto.password, 15);

    const users = await this.usersService.createUsers({
      email: registerDto.email,
      created_at: new Date(),
      updated_at: new Date(),
      email_verified: new Date(),
      last_activity_at: new Date(),
      name: registerDto.name,
      password: hashPassword,
      workspace_id: registerDto.workspace_id,
    });

    return {
      token: await this.jwtService.sign({ email: users.email }),
    };
  }
}
