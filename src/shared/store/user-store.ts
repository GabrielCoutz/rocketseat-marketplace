import { IUser } from '../interfaces/user';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ISetSessionPayload {
  user: IUser;
  token: string;
  refreshToken: string;
}

interface IUpdateTokensPayload {
  token: string;
  refreshToken: string;
}

export interface IUserStore {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;

  setSession: (payload: ISetSessionPayload) => Promise<void>;
  logout: VoidFunction;
  updateTokens: (payload: IUpdateTokensPayload) => void;
  updateUser: (payload: Partial<IUser>) => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,

      setSession: async (payload) => {
        set(payload);

        await AsyncStorage.setItem('user', JSON.stringify(payload));
      },
      updateTokens: (payload) => set(payload),
      logout: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
        }),
      updateUser: (payload) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...payload } : null,
        })),
    }),

    {
      name: 'marketplace-user-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
