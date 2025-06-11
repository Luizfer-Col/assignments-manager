import type { Database } from '@/src/core/db/types';
export const fetchPeople = async (db: Database) => {
  try {
    const people = await db.query.person.findMany();
    console.log('People fetched successfully', people);
    return people;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
};
