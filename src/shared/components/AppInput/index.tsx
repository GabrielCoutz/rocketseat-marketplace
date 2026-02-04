import { Pressable, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { appInputVariants, IAppInputVariants } from './input.variants';
import { Ionicons } from '@expo/vector-icons';
import { useAppInputViewModel } from './useAppInputViewModel';

export interface IAppInputProps extends TextInputProps, IAppInputVariants {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  containerClassName?: string;
  mask?: (value: string) => string | undefined;
}

export const AppInput = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerClassName,
  value,
  isError,
  isDisabled,
  secureTextEntry,
  onBlur,
  onFocus,
  onChangeText,
  mask,
  ...rest
}: IAppInputProps) => {
  const {
    inputRef,
    showPassword,
    isFocused,
    handleChangePasswordVisibility,
    handleWrapperPress,
    handleFocus,
    handleBlur,
    getIconColor,
    handleTextChange,
  } = useAppInputViewModel({
    value,
    isError,
    isDisabled,
    error,
    secureTextEntry,
    onBlur,
    onFocus,
    onChangeText,
    mask,
  });
  const styles = appInputVariants({
    isFocused,
  });

  return (
    <View
      className={styles.container({
        className: containerClassName,
      })}>
      <Text className={styles.label()}>{label}</Text>

      <Pressable className={styles.wrapper()}>
        {leftIcon && <Ionicons className="mr-3" name={leftIcon} size={22} color={getIconColor()} />}

        <TextInput
          className={styles.input()}
          onBlur={handleBlur}
          onFocus={handleFocus}
          ref={inputRef}
          editable={!isDisabled}
          secureTextEntry={showPassword}
          value={value}
          onChangeText={handleTextChange}
          {...rest}
        />

        {rightIcon && !secureTextEntry && (
          <Ionicons className="ml-3" name={rightIcon} size={22} color={getIconColor()} />
        )}

        {secureTextEntry && (
          <TouchableOpacity
            className="ml-3"
            onPress={handleChangePasswordVisibility}
            activeOpacity={0.7}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={22}
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}
      </Pressable>

      {error && (
        <Text className={styles.error()}>
          <Ionicons name="alert-circle-outline" size={14} color="#FF375F" /> {error}
        </Text>
      )}
    </View>
  );
};
