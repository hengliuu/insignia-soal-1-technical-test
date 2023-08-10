import { IsEmail, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  phone_number: string;

  @IsString()
  @IsEmail()
  @Length(5, 100)
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(5, 150)
  @IsNotEmpty()
  address: string;

  @IsUUID()
  @IsNotEmpty()
  workspace_id: string;
}

export class UpdateContactDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  phone_number: string;

  @IsString()
  @IsEmail()
  @Length(5, 100)
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(5, 150)
  @IsNotEmpty()
  address: string;

  @IsUUID()
  @IsNotEmpty()
  workspace_id: string;
}
