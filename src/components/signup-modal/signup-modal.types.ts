import { UserData } from "../../services/slices/users/users.types.ts";

export interface FormikValues {
  number: string;
}

export interface AuthenticatedUserData {
  status: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: UserData;
}
