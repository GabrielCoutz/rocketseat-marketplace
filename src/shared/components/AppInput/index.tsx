import { Pressable, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { appInputVariants, IAppInputVariants } from './input.variants';
import { Ionicons } from '@expo/vector-icons';

export interface IAppInputProps extends TextInputProps, IAppInputVariants {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  containerClassName?: string;
  mask?: (value: string) => string | void;
}

export const AppInput = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerClassName,
  mask,
  ...rest
}: IAppInputProps) => {
  const styles = appInputVariants({});

  return (
    <View
      className={styles.container({
        className: containerClassName,
      })}>
      <Text className={styles.label()}>Label</Text>

      <Pressable className={styles.wrapper()}>
        <Ionicons name="person" size={22} />

        <TextInput className={styles.input()} {...rest} />

        <TouchableOpacity>
          <Ionicons name="eye-off-outline" size={22} />
        </TouchableOpacity>
      </Pressable>
    </View>
  );
};
