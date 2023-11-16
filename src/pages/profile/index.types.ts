export interface ProfilePageType {
  isFixedHeader: boolean;
}

export interface InputData {
  value: string;
  isDisabled: boolean;
}

export interface Inputs {
  name: InputData;
  email: InputData;
  number: InputData;
  birthdate: InputData;
}
