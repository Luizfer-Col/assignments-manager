import migrations from '@/drizzle/migrations';
import db, { DATABASE_NAME } from '@/src/core/db';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
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
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
