import { Text, View } from 'react-native';
import { AppInput } from '../shared/components/AppInput';

export default function LoginScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <AppInput label="Username" error="dshayui8oldhs" />
      <AppInput label="Password" secureTextEntry />
    </View>
  );
}
