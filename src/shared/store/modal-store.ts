import { ReactNode } from 'react';
import { create } from 'zustand';

interface IModalConfig {
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  statusBarTranslucent?: boolean;
}

interface IModalStore {
  isOpen: boolean;
  content: ReactNode | null;
  config: IModalConfig;

  open: (content: ReactNode, config?: IModalConfig) => void;
  close: VoidFunction;
}

export const useModalStore = create<IModalStore>((set, get) => ({
  isOpen: false,
  content: null,
  config: {
    animationType: 'fade',
    transparent: false,
    statusBarTranslucent: false,
  },

  open: (content: ReactNode, config?: IModalConfig) =>
    set({
      isOpen: true,
      content,
      config: {
        ...get().config,
        ...config,
      },
    }),
  close: () =>
    set({
      isOpen: false,
      content: null,
    }),
}));
