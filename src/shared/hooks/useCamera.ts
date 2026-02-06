import { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Toast } from 'toastify-react-native';

interface IUseCameraProps {
  aspect?: [number, number];
  quality?: number;
  allowEditing?: boolean;
  exif?: boolean;
}

export const useCamera = ({ allowEditing, aspect, exif, quality }: IUseCameraProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const requestCameraPermission = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      const granted = status === 'granted';
      if (!granted)
        Toast.error(
          'Permissão para acessar a câmera negada. Por favor, permita o acesso para usar esta funcionalidade.',
          'top'
        );

      return granted;
    } catch (error) {
      Toast.error(
        'Ocorreu um erro ao solicitar permissão para acessar a câmera. Tente novamente.',
        'top'
      );
      return false;
    }
  }, []);

  const openCamera = useCallback(async () => {
    setIsLoading(true);

    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchCameraAsync({
        aspect,
        quality,
        allowsEditing: allowEditing,
        exif,
      });

      if (!result.canceled && result?.assets?.length > 0) {
        Toast.success('Imagem capturada com sucesso!', 'top');

        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      Toast.error('Não foi possível abrir a câmera. Tente novamente.', 'top');

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [allowEditing, aspect, exif, quality]);

  return {
    requestCameraPermission,
    openCamera,
    isLoading,
  };
};
