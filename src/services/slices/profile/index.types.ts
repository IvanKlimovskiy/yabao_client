export interface ProfileDataType {
  _id: string;
  name: string;
  img: string;
  number: string;
  email: string;
  birthdate: string;
  isActivated: boolean;
  isSubscribed: boolean;
}

export interface ProfileState {
  isLoading: boolean;
  profileRequest: boolean;
  profileFailed: boolean;
  accessToken: string | null;
  isLoggingOut: boolean;
  isAuthorized: boolean;
  profileData: ProfileDataType;
}
