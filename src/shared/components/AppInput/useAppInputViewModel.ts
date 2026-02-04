import { useRef, useState } from 'react';
import { BlurEvent, FocusEvent } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../../../styles/colors';

interface IUseAppInputViewModelProps {
  value?: string;
  isError?: boolean;
  isDisabled?: boolean;
  error?: string;
  secureTextEntry?: boolean;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: BlurEvent) => void;
  mask?: (value: string) => string | void;
  onChangeText?: (text: string) => string | void;
}

export const useAppInputViewModel = ({
  value,
  isError,
  isDisabled,
  error,
  secureTextEntry,
  onFocus,
  onBlur,
  mask,
  onChangeText,
}: IUseAppInputViewModelProps) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const handleChangePasswordVisibility = () => setShowPassword((prevState) => !prevState);

  const handleWrapperPress = () => {
    inputRef.current?.focus();
  };

  const handleFocus = (event: FocusEvent) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: BlurEvent) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const getIconColor = (): string =>
    isFocused
      ? colors['purple-base']
      : isError
        ? colors.danger
        : !!value
          ? colors['purple-base']
          : colors.gray[200];

  const handleTextChange = (text: string) => {
    if (!!mask) onChangeText?.(mask(text) || '');
    else onChangeText?.(text);
  };

  return {
    inputRef,
    isFocused,
    showPassword,
    handleChangePasswordVisibility,
    handleWrapperPress,
    handleFocus,
    handleBlur,
    getIconColor,
    handleTextChange,
  };
};
