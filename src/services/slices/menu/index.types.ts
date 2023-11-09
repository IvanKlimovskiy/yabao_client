export interface MenuObject {
  _id: string;
  name: string;
  img: string;
  price: number;
  description: string;
  isNewProduct: boolean;
}
export interface MenuElement {
  [key: string]: MenuObject[];
}
export interface MenuState {
  menuRequest: boolean;
  loading: boolean;
  menuFailed: boolean;
  menu: [] | MenuElement[];
  error: string | undefined;
}

export interface jsonData {
  status: string;
  data: MenuElement;
}

export interface jsonError {
  status: string;
  error: string;
}
