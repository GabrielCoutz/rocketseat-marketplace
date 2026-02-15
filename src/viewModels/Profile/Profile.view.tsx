import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { AppButton } from '../../shared/components/AppButton';
import { AppInputController } from '../../shared/components/AppInputController';
import { KeyboardContainer } from '../../shared/components/KeyboardContainer';
import { Header } from './components/Header';
import { useProfileViewModel } from './useProfile.viewModel';

export const ProfileView: FC<ReturnType<typeof useProfileViewModel>> = ({
  control,
  onSubmit,
  avatarUri,
  isSubmitting,
  handleSelectImage,
}) => {
  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-[40px]">
        <Header />
        <TouchableOpacity
          onPress={handleSelectImage}
          className="mb-8 mt-6 h-[120px] w-[120px] items-center justify-center self-center rounded-xl bg-shape">
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              className="h-full w-full rounded-xl"
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="cloud-upload-outline" size={32} />
          )}
        </TouchableOpacity>
        <Text className="mt-6 text-base font-bold text-gray-500">Dados pessoais</Text>

        <AppInputController
          leftIcon="person-outline"
          label="NOME"
          control={control}
          name="name"
          placeholder="Seu nome completo"
        />

        <AppInputController
          leftIcon="call-outline"
          label="TELEFONE"
          control={control}
          name="phone"
          placeholder="(00) 00000-0000"
        />

        <Text className="mt-6 text-base font-bold text-gray-500">Acesso</Text>

        <AppInputController
          leftIcon="mail-outline"
          label="E-MAIL"
          control={control}
          name="email"
          placeholder="mail@example.com.br"
        />

        <AppInputController
          leftIcon="lock-closed-outline"
          label="SENHA"
          control={control}
          name="password"
          placeholder="Sua senha"
          secureTextEntry
        />

        <AppInputController
          leftIcon="lock-closed-outline"
          label="CONFIRMAR SENHA"
          control={control}
          name="confirmPassword"
          placeholder="Confirme sua senha"
          secureTextEntry
        />

        <AppButton className="mt-6" onPress={onSubmit} isLoading={isSubmitting}>
          Atualizar cadastro
        </AppButton>
      </ScrollView>
    </KeyboardContainer>
  );
};
