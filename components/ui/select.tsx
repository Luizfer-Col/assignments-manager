import Ionicons from '@expo/vector-icons/Ionicons';
import * as SelectPrimitive from '@rn-primitives/select';
import * as React from 'react';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { cn } from '~/lib/utils';

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

function SelectTrigger({
  ref,
  className,
  children,
  ...props
}: SelectPrimitive.TriggerProps & {
  ref?: React.RefObject<SelectPrimitive.TriggerRef>;
  children?: React.ReactNode;
}) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-row h-10 native:h-12 items-center justify-between rounded-md border border-input bg-background px-3 py-2',
        'web:ring-offset-background web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2',
        '[&>span]:line-clamp-1 text-sm native:text-base text-muted-foreground',
        props.disabled && 'opacity-50 web:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
      <Ionicons name="chevron-down" size={16} className="text-red opacity-50 ml-2" />
    </SelectPrimitive.Trigger>
  );
}

function SelectScrollUpButton({ className, ...props }: SelectPrimitive.ScrollUpButtonProps) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn('flex web:cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <Ionicons name="chevron-up" size={14} className="text-foreground" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({ className, ...props }: SelectPrimitive.ScrollDownButtonProps) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn('flex web:cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <Ionicons name="chevron-down" size={14} className="text-foreground" />
    </SelectPrimitive.ScrollDownButton>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  portalHost,
  animated = true,
  ...props
}: SelectPrimitive.ContentProps & {
  ref?: React.RefObject<SelectPrimitive.ContentRef>;
  className?: string;
  portalHost?: string;
  animated?: boolean;
}) {
  const { open } = SelectPrimitive.useRootContext();
  const { width: windowWidth } = useWindowDimensions();

  // Ajuste del ancho para mobile
  const contentWidth = Math.min(windowWidth - 32, 400); // Máximo 400px con margen de 16px a cada lado

  const ContentWrapper = animated ? Animated.View : View;
  const animationProps = animated ? { entering: FadeIn, exiting: FadeOut } : {};

  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <SelectPrimitive.Overlay style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}>
        <ContentWrapper className="z-50" {...animationProps}>
          <SelectPrimitive.Content
            style={Platform.OS !== 'web' ? { width: contentWidth } : undefined}
            className={cn(
              'relative z-50 max-h-96 min-w-[8rem] rounded-md border border-border bg-popover shadow-md shadow-foreground/10 py-2 px-1',
              'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              position === 'popper' && [
                'data-[side=bottom]:translate-y-1',
                'data-[side=left]:-translate-x-1',
                'data-[side=right]:translate-x-1',
                'data-[side=top]:-translate-y-1',
              ],
              animated &&
                Platform.OS === 'web' && [
                  open
                    ? 'web:zoom-in-95 web:animate-in web:fade-in-0'
                    : 'web:zoom-out-95 web:animate-out web:fade-out-0',
                ],
              className,
            )}
            position={position}
            {...props}
          >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
              className={cn(
                'p-1',
                position === 'popper' && [
                  'h-[var(--radix-select-trigger-height)]',
                  'w-full min-w-[var(--radix-select-trigger-width)]',
                ],
              )}
            >
              {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </SelectPrimitive.Content>
        </ContentWrapper>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.LabelProps & {
  ref?: React.RefObject<SelectPrimitive.LabelRef>;
}) {
  return (
    <SelectPrimitive.Label
      className={cn(
        'py-1.5 native:pb-2 pl-8 native:pl-10 pr-2 text-popover-foreground text-sm native:text-base font-semibold',
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.ItemProps & {
  ref?: React.RefObject<SelectPrimitive.ItemRef>;
}) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex flex-row w-full items-center rounded-sm py-1.5 native:py-2 pl-8 native:pl-10 pr-2',
        'web:cursor-default web:select-none web:hover:bg-accent/50 active:bg-accent web:outline-none web:focus:bg-accent',
        props.disabled && 'opacity-50 web:pointer-events-none',
        className,
      )}
      {...props}
    >
      <View className="absolute left-2 native:left-3.5 flex h-3.5 native:pt-px w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Ionicons
            name="checkmark-circle-outline"
            size={16}
            className="text-popover-foreground w-4 h-4"
          />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText
        className="text-sm native:text-lg text-popover-foreground native:text-base web:group-focus:text-accent-foreground"
        numberOfLines={1} // Previene texto que se desborda
      />
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.SeparatorProps & {
  ref?: React.RefObject<SelectPrimitive.SeparatorRef>;
}) {
  return (
    <SelectPrimitive.Separator className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
