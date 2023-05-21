import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import GigsListPage from '../../GigsList';

export default function Gigs() {
  return (
    <View>
      <GigsListPage />
      {/* <View style={styles.container}>
        <Text>The seller has no active Gigs at the moment</Text>
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
