import { marketPlaceApiClient } from '../api/market-place';
import { AuthResponse } from '../interfaces/http/auth-response';
import { LoginHttpParams } from '../interfaces/http/login';
import { IRegisterHttpParams, IRegisterHttpResponse } from '../interfaces/http/register';

export const register = async (payload: IRegisterHttpParams): Promise<IRegisterHttpResponse> => {
  const { data } = await marketPlaceApiClient.post<IRegisterHttpResponse>(
    '/auth/register',
    payload
  );

  return data;
};

export const login = async (userData: LoginHttpParams) => {
  const { data } = await marketPlaceApiClient.post<AuthResponse>('/auth/login', userData);

  return data;
};
