import { ProfileDataType } from "../profile/index.types.ts";

export interface UserData extends ProfileDataType {
  refreshToken: string;
}

export interface jsonDataUsers {
  status: string;
  data: {
    users: UserData[];
  };
}

export interface UsersState {
  usersRequest: boolean;
  loading: boolean;
  usersFailed: boolean;
  users: UserData[];
  error: string | undefined;
}
