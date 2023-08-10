export class Users {
  created_at: string | Date;
  updated_at?: string | Date;
  last_activity_at: string | Date;
  email: string;
  email_verified: string | Date;
  name: string;
  password: string;
  workspace_id: string;
}

export class UpdateUsersLastActivityAtRequestModel {
  email: string;
  last_activity_at: string | Date;
}

export class UpdateUsersResponseModel {
  id: string;
  email: string;
  name: string;
  workspace_id: string;
}

export class UpdateUsersRequestModel {
  id: string;
  email: string;
  name: string;
  workspace_id: string;
}
