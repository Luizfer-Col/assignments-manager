import * as React from 'react';
import { StyleProp, Text, TextInput, View, ViewStyle, type TextInputProps } from 'react-native';
import { cn } from '~/lib/utils';

type InputLayout = 'vertical' | 'horizontal';
type InputVariant = 'default' | 'outline' | 'ghost';

interface InputProps extends TextInputProps {
  ref?: React.RefObject<TextInput>;
  className?: string;
  placeholderClassName?: string;
  label?: string;
  labelClassName?: string;
  layout?: InputLayout;
  variant?: InputVariant;
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  errorClassName?: string;
}

function InputLabel({
  className,
  placeholderClassName,
  label,
  labelClassName,
  layout = 'vertical',
  variant = 'default',
  containerClassName,
  containerStyle,
  error,
  errorClassName,
  ...props
}: InputProps) {
  const inputClasses = cn(
    // Clases base
    'web:flex h-10 native:h-12 web:w-full rounded-md text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',

    // Variantes
    variant === 'default' && 'bg-background border border-input',
    variant === 'outline' && 'bg-transparent border border-foreground',
    variant === 'ghost' && 'bg-transparent border-0',

    // Estados
    props.editable === false && 'opacity-50 web:cursor-not-allowed',
    error && 'border-destructive',

    className,
  );

  const labelClasses = cn(
    'text-sm font-medium text-foreground mb-1',
    layout === 'horizontal' && 'mr-3 self-center',
    error && 'text-destructive',
    labelClassName,
  );

  const errorClasses = cn('text-sm text-destructive mt-1', errorClassName);

  return (
    <View
      className={cn(
        layout === 'horizontal' ? 'flex-row items-center' : 'flex-col',
        containerClassName,
      )}
      style={containerStyle}
    >
      {label && <Text className={labelClasses}>{label}</Text>}

      <TextInput
        className={inputClasses}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        {...props}
      />

      {error && <Text className={errorClasses}>{error}</Text>}
    </View>
  );
}

export { InputLabel };
