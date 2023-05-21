import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../../Utils/colors';
export default function Reviews() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Their is no reviews yet at the moment</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text: {
    color: 'gray',
  },
});
