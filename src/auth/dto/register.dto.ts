import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @Length(8, 100)
  email: string;

  @IsString()
  @Length(5, 100)
  name: string;

  @IsString()
  @Length(3, 100)
  password: string;

  workspaceId: string;
}
