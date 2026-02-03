import { IUser } from '../user';

export interface IRegisterHttpParams {
  name: string;
  email: string;
  password: string;
  phone: string;
  avatarUrl: string;
}

export interface IRegisterHttpResponse {
  user: IUser;
  token: string;
  refreshToken: string;
}
