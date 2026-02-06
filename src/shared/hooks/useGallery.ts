import { ImagePickerOptions } from 'expo-image-picker';
import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { Toast } from 'toastify-react-native';
import { Alert, Linking } from 'react-native';

export const useGallery = (props: ImagePickerOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const requestGalleryPermission = async () => {
    setIsLoading(true);
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de acesso à galeria para selecionar uma imagem.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Abrir Configurações',
              onPress: () => Linking.openSettings(),
            },
          ]
        );

        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting gallery permission:', error);

      Toast.error('Ocorreu um erro ao solicitar permissão para acessar a galeria.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const openGallery = async () => {
    setIsLoading(true);

    try {
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync(props);

      if (!result.canceled && result?.assets?.length > 0) {
        Toast.success('Imagem selecionada com sucesso!');

        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.error('Error opening gallery:', error);
      Toast.error('Ocorreu um erro ao abrir a galeria.');

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    openGallery,
    requestGalleryPermission,
  };
};
