import { type Person } from '@/src/core/db/schemas/peopleSchema';
import { PEOPLE_MOCK } from '@/src/mocks/people.mock';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View, useWindowDimensions } from 'react-native';

export default function PeopleScreen() {
  const [people, setPeople] = useState<Person[]>([]);
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const numColumns = isMobile ? 1 : isTablet ? 2 : 3;

  useEffect(() => {
    setPeople(PEOPLE_MOCK);
  }, []);

  return (
    <View className="flex-1 p-6 gap-6 bg-gray-50">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-xl font-semibold text-gray-900">Personas</Text>
        <Link href={'/people/newPerson'}>
          <Ionicons name="person-add" size={22} className="text-gray-900" />
        </Link>
      </View>

      <FlatList
        key={`columns-${numColumns}`}
        contentContainerClassName={'pb-4 gap-8 justify-between'}
        data={people}
        keyExtractor={item => item.id.toString()}
        numColumns={numColumns}
        columnWrapperClassName={isMobile ? undefined : 'justify-between'}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-10">
            <Text className="text-center text-gray-500">
              Aún no tienes ninguna persona. Pulsa en el{' '}
              <Ionicons name="person-add" size={14} color="gray" /> para comenzar
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            className={`
              p-4  bg-white rounded-lg shadow-sm border border-gray-100
              ${isMobile ? 'w-full' : isTablet ? 'w-[49.5%]' : 'w-[33%]'}
              active:opacity-70
            `}
          >
            <Text className="text-base font-medium text-gray-900">
              {item.name} {item.lastname}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
