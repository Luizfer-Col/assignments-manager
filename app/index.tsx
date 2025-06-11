import db from '@/src/core/db';
import { type Person } from '@/src/core/db/schemas/peopleSchema';
import { fetchPeople } from '@/src/features/people/services/peopleService';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const COLORS = {
  errorRed: '#961a00',
  successGreen: '#009600',
  white: '#ffffff',
};

export default function Index() {
  // Alternative to invoking drizzle
  // const db= useSQLiteContext()
  // const drizzleDb = drizzle(db, { schema: schemas})
  const [people, setPeople] = useState<Person[]>([]);

  const getPeople = async () => {
    console.log('fetch people');
    const people = await fetchPeople(db);
    setPeople(people);
    console.log('people initial req', people);
  };

  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screens.</Text>
      <Pressable onPress={getPeople} style={styles.buttonPeople}>
        <Text style={styles.textColor}>Fetch people</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          console.log('add person');
        }}
        style={styles.buttonAdd}
      >
        <Text style={styles.textColor}>Add person</Text>
      </Pressable>

      <FlatList
        data={people}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text>{item.name}</Text>
            <Text>{item.id}</Text>
            <Text>{item.birthdate}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAdd: {
    backgroundColor: COLORS.successGreen,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonPeople: {
    backgroundColor: COLORS.errorRed,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  textColor: {
    color: COLORS.white,
  },
});
