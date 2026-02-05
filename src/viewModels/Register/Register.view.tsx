import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRegisterViewModel } from './useRegister.viewModel';
import { AppInputController } from '../../shared/components/AppInputController';
import { AuthFormHeader } from '../../shared/components/AuthFormHeader';
import { KeyboardContainer } from '../../shared/components/KeyboardContainer';

export const RegisterView = (props: ReturnType<typeof useRegisterViewModel>) => {
  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-[40]">
        <AuthFormHeader title="Crie sua conta" subTitle="Informe seus dados pessoais e de acesso" />

        <AppInputController
          control={props?.control}
          name="name"
          label="NOME"
          leftIcon="person-outline"
        />

        <AppInputController
          control={props?.control}
          name="email"
          label="E-MAIL"
          leftIcon="mail-outline"
        />

        <AppInputController
          control={props?.control}
          name="phone"
          label="TELEFONE"
          leftIcon="call-outline"
        />

        <Text className="mt-6 text-base font-bold text-gray-500">Acesso</Text>

        <AppInputController
          control={props?.control}
          name="password"
          label="SENHA"
          leftIcon="lock-closed-outline"
          secureTextEntry
        />

        <AppInputController
          control={props?.control}
          name="confirmPassword"
          label="CONFIRMAR SENHA"
          leftIcon="lock-closed-outline"
          secureTextEntry
        />

        <TouchableOpacity onPress={props?.onSubmit}>
          <Text>Registro</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardContainer>
  );
};
