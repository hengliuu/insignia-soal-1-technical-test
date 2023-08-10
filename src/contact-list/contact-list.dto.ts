import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateContactListDto {
  @IsUUID()
  @IsNotEmpty()
  contact_id: string;

  @IsUUID()
  @IsNotEmpty()
  contact_group_id: string;
}
