import migrations from '@/drizzle/migrations';
import '@/global.css';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '@/lib/useColorScheme';
import db, { DATABASE_NAME } from '@/src/core/db';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';

const LIGHT_THEME = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

const AppContent = () => {
  const { isDarkColorScheme } = useColorScheme();
  const isDark = isDarkColorScheme;

  return (
    <ThemeProvider value={isDark ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
};

const MobileLayout = () => {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return <Text className="text-destructive">Error en la base de datos: {error.message}</Text>;
  }

  if (!success) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SQLite.SQLiteProvider databaseName={DATABASE_NAME}>
      <AppContent />
    </SQLite.SQLiteProvider>
  );
};

export default function RootLayout() {
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      document.documentElement.classList.add('bg-background');
    }
  }, []);

  return Platform.OS === 'web' ? <AppContent /> : <MobileLayout />;
}
