import migrations from '@/drizzle/migrations';
import db, { DATABASE_NAME } from '@/src/core/db';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import '../global.css';

const AppContent = () => (
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="+not-found" />
  </Stack>
);

const MobileLayout = () => {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return <Text>Database error: {error.message}</Text>;
  }

  if (!success) {
    return (
      <View className="flex-1 justify-center items-center">
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
  if (Platform.OS === 'web') {
    return <AppContent />;
  }

  return <MobileLayout />;
}
