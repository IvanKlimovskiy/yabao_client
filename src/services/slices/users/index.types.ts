export interface UserData {
  _id: string;
  name: string;
  img: string;
  number: string;
  email: string;
  birthdate: string;
  isActivated: boolean;
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
