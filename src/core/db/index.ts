import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { schemas } from './schemas';

export const DATABASE_NAME = 'assignments-manager.db';
console.log('Opening database:', DATABASE_NAME);

export const expoDB = SQLite.openDatabaseSync(DATABASE_NAME);
console.log('Database opened successfully');

const db = drizzle(expoDB, { schema: schemas });
console.log('Drizzle ORM initialized');

export default db;
