import migrations from '@/drizzle/migrations';
import db, { DATABASE_NAME } from '@/src/core/db';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { ActivityIndicator, Text, View } from 'react-native';

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return <Text>{error.message}</Text>;
  }
  if (!success) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SQLite.SQLiteProvider databaseName={DATABASE_NAME}>
      <Stack />
    </SQLite.SQLiteProvider>
  );
}
