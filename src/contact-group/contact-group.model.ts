import { contact } from '@prisma/client';

export class CreateContactGroupRequestModal {
  name: string;
  description: string;
}

export class UpdateContactGroupRequestModal {
  id: string;
  name: string;
  description: string;
}

export class GetGroupContactHeaderResponse {
  id: string;
  created_at: Date;
  updated_at: Date | null;
  name: string;
  description: string;
  contacts: GetGroupContactDetailResponse[];
}

export class GetGroupContactDetailResponse {
  id: string;
  created_at: Date;
  updated_at: Date | null;
  workspace_id: string;
  name: string;
  phone_number: string;
  email: string;
  address: string;
}
