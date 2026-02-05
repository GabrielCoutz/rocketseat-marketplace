import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { AppInput, IAppInputProps } from '../AppInput';

interface IAppInputControllerProps<T extends FieldValues> extends Omit<
  IAppInputProps,
  'value' | 'onChangeText' | 'error'
> {
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
}

export const AppInputController = <T extends FieldValues>({
  control,
  name,
  errors,
  ...rest
}: IAppInputControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
        formState: { isSubmitting },
      }) => (
        <AppInput
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          error={error?.message}
          isDisabled={isSubmitting || rest.isDisabled}
          {...rest}
        />
      )}
    />
  );
};
