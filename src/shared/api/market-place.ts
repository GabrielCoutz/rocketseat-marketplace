import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';
import { Platform } from 'react-native';

import { IUserStore, useUserStore } from '../store/user-store';

const getBaseURL = () => {
  return Platform.select({
    ios: 'http://localhost:3001',
    android: 'http://10.0.2.2:3001',
  });
};

export const baseURL = getBaseURL();

export class MarketPlaceApiClient {
  private instance: AxiosInstance;
  private isRefreshing: boolean = false;

  constructor() {
    this.instance = axios.create({
      baseURL,
    });

    this.setupInterceptors();
  }

  getInstance() {
    return this.instance;
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async (config) => {
        const userData = await AsyncStorage.getItem('marketplace-user-store');

        if (!!userData) {
          const user: IUserStore = JSON.parse(userData);

          config.headers['Authorization'] = `Bearer ${user.token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      async (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error?.response?.status === 401 &&
          error?.response?.data?.message === 'Token expirado' &&
          !this.isRefreshing
        ) {
          this.isRefreshing = true;

          try {
            const userData = await AsyncStorage.getItem('marketplace-user-store');

            if (!userData) throw new Error('No user data found');

            const user: IUserStore = JSON.parse(userData);

            const response = await this.instance.post('/auth/refresh', {
              refreshToken: user.refreshToken,
            });

            const { token, refreshToken } = response.data;

            const updatedUser = {
              ...user,
              token,
              refreshToken,
            };

            await AsyncStorage.setItem('marketplace-user-store', JSON.stringify(updatedUser));

            originalRequest.headers['Authorization'] = `Bearer ${token}`;

            return this.instance(originalRequest);
          } catch (error) {
            this.handleUnauthorized();
            return Promise.reject(new Error('Sessão expirada. Faça login novamente.'));
          } finally {
            this.isRefreshing = false;
          }
        }

        if (!!error?.response?.data)
          return Promise.reject(
            new Error(error.response.data.message || 'Ocorreu um erro. Tente novamente.')
          );
        else return Promise.reject(new Error('Ocorreu um erro. Tente novamente.'));
      }
    );
  }

  private async handleUnauthorized() {
    const { logout } = useUserStore.getState();

    delete this.instance.defaults.headers.common['Authorization'];
    logout();
  }
}

export const marketPlaceApiClient = new MarketPlaceApiClient().getInstance();
