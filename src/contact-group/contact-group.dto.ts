import { IsString, Length } from 'class-validator';

export class CreateContactGroupDto {
  @IsString()
  @Length(5, 100)
  name: string;

  @IsString()
  @Length(5, 256)
  description: string;
}

export class UpdateContactGroupDto {
  @IsString()
  @Length(5, 100)
  name: string;

  @IsString()
  @Length(5, 256)
  description: string;
}
