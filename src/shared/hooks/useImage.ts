import { ImagePickerOptions } from 'expo-image-picker';
import { useAppModal } from './useAppModal';
import { useCamera } from './useCamera';
import { useGallery } from './useGallery';
import { useModalStore } from '../store/modal-store';

interface IUseImageProps extends ImagePickerOptions {
  callback?: (uri: string) => void;
}

export const useImage = (props: IUseImageProps) => {
  const { openCamera } = useCamera(props);
  const { openGallery } = useGallery(props);
  const modals = useAppModal();
  const { close } = useModalStore();

  const handleCallback = (uri: string) => {
    if (props.callback) props.callback(uri);
    close();
  };

  const handleSelectImage = async () => {
    modals.showSelection({
      title: 'Selecionar foto',
      message: 'Escolha uma opção:',
      options: [
        {
          text: 'Galeria',
          icon: 'images',
          variant: 'primary',
          onPress: async () => {
            const uri = await openGallery();
            if (uri) handleCallback(uri);
          },
        },
        {
          text: 'Câmera',
          icon: 'camera',
          variant: 'primary',
          onPress: async () => {
            const uri = await openCamera();
            if (uri) handleCallback(uri);
          },
        },
      ],
    });
  };

  return {
    handleSelectImage,
  };
};
