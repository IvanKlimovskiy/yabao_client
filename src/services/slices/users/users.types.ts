export interface jsonDataUsers {
  status: string;
  data: {
    users: UserData[];
  };
}

export interface UserData {
  _id: string;
  name: string;
  img: string;
  number: string;
  refreshToken: string;
}

export interface UsersState {
  usersRequest: boolean;
  loading: boolean;
  usersFailed: boolean;
  users: UserData[];
  error: string | undefined;
}
