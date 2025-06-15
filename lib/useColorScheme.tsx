import { useColorScheme as useNativewindColorScheme } from 'nativewind';

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();
  const isDark = colorScheme === 'dark';
  return {
    colorScheme: colorScheme || 'dark',
    isDarkColorScheme: isDark,
    setColorScheme,
    toggleColorScheme,
  };
}
