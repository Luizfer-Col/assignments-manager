import { StyleSheet, Text, View } from 'react-native';

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <Text>Tab Events</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
