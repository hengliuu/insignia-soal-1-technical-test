import { IsEmail, IsString, Length } from 'class-validator';

export class loginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
