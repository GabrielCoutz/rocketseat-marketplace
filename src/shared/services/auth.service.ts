import { marketPlaceApiClient } from '../api/market-place';
import { IRegisterHttpParams, IRegisterHttpResponse } from '../interfaces/http/register';

export const register = async (payload: IRegisterHttpParams): Promise<IRegisterHttpResponse> => {
  const { data } = await marketPlaceApiClient.post<IRegisterHttpResponse>(
    '/auth/register',
    payload
  );

  return data;
};
