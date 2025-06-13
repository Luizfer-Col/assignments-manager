import { StyleSheet, Text, View } from 'react-native';

export default function PeopleScreen() {
  return (
    <View style={styles.container}>
      <Text>Tab People</Text>
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
