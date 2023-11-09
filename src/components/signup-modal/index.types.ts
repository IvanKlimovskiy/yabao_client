import { UserData } from "../../services/slices/users/index.types.ts";

export interface FormikValues {
  number: string;
}
export interface ResponseCodeType {
  code: number;
}
export interface AuthenticatedUserData {
  status: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: UserData;
}
