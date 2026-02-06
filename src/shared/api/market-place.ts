import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';
import { Platform } from 'react-native';

import { IUserStore } from '../store/user-store';

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
  }
}

export const marketPlaceApiClient = new MarketPlaceApiClient().getInstance();
