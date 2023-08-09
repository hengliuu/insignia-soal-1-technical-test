import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(userId: number): Promise<string> {
    const payload = { user_id: userId };
    return this.jwtService.signAsync(payload);
  }
}
