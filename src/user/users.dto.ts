import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateUsersDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUUID()
  @IsNotEmpty()
  workspace_id: string;
}
