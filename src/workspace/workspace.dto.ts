import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class DeleteWorkspaceDto {
  id: string;
}
