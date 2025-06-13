import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // headerShown: false,
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="people"
        options={{
          title: 'People',
        }}
      />
    </Tabs>
  );
}
