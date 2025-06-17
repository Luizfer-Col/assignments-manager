import { Stack } from 'expo-router';

export default function PeopleLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Gestión de Personas' }} />
      <Stack.Screen name="newPerson" options={{ title: 'Nueva Persona' }} />
    </Stack>
  );
}
