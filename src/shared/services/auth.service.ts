import { baseURL, marketPlaceApiClient } from '../api/market-place';
import { AuthResponse } from '../interfaces/http/auth-response';
import { LoginHttpParams } from '../interfaces/http/login';
import { IRegisterHttpParams, IRegisterHttpResponse } from '../interfaces/http/register';
import { IUploadAvatarResponse } from '../interfaces/http/upload-avatar';

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

export const uploadAvatar = async (avatarUri: string) => {
  const formData = new FormData();

  formData.append('avatar', {
    uri: avatarUri,
    name: 'avatar.jpeg',
    type: 'image/jpeg',
  } as unknown as Blob);

  const { data } = await marketPlaceApiClient.post<IUploadAvatarResponse>(
    '/user/avatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  data.url = `${baseURL}${data.url}`;

  return data;
};
