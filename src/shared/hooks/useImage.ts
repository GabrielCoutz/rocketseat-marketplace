import { ImagePickerOptions } from 'expo-image-picker';
import { useAppModal } from './useAppModal';
import { useCamera } from './useCamera';
import { useGallery } from './useGallery';

export const useImage = (props: ImagePickerOptions) => {
  const { openCamera } = useCamera(props);
  const { openGallery } = useGallery(props);
  const modals = useAppModal();

  const handleSelectImage = async () => {
    modals.showSelection({
      title: 'Selecionar foto',
      message: 'Escolha uma opção:',
      options: [
        {
          text: 'Galeria',
          icon: 'images',
          variant: 'primary',
          onPress: async () => await openGallery(),
        },
        {
          text: 'Câmera',
          icon: 'camera',
          variant: 'primary',
          onPress: async () => await openCamera(),
        },
      ],
    });
  };

  return {
    handleSelectImage,
  };
};
