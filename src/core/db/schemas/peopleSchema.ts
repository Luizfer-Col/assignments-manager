import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const person = sqliteTable('people', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  lastname: text('lastname').notNull(),
  birthdate: text('birthdate'),
});

export type Person = typeof person.$inferSelect;
