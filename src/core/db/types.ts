import { drizzle } from 'drizzle-orm/expo-sqlite';
import { schemas } from './schemas';

export type Database = ReturnType<typeof drizzle<typeof schemas>>;
