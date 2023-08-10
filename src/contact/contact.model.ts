export class CreateContactRequestModel {
  workspace_id: string;
  name: string;
  phone_number: string;
  email: string;
  address: string;
}

export class UpdateContactRequestModel {
  id: string;
  workspace_id: string;
  name: string;
  phone_number: string;
  email: string;
  address: string;
}

export class GetContactHeaderResponse {
  id: string;
  created_at: Date;
  updated_at: Date | null;
  workspace_id: string;
  name: string;
  phone_number: string;
  email: string;
  address: string;
  contact_groups: GetContactDetailResponse[];
}

export class GetContactDetailResponse {
  id: string;
  created_at: Date;
  updated_at: Date | null;
  name: string;
  description: string;
}
