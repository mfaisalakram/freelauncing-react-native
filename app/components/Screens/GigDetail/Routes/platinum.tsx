import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import GigsListPage from '../../GigsList';
import { gigs } from '../../GigsList';

export default function Platinum() {
  return (
    <View style={styles.packageContentView}>
      <Text style={styles.packageHeading}>
        {gigs[0].packages[2].title} Package
      </Text>
      <Text style={{ marginTop: 20, textAlign: 'left' }}>
        {gigs[0].packages[2].description}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}
      >
        <Text>Delivery Days</Text>
        <Text>{gigs[0].packages[2].deliveryDays} Days</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}
      >
        <Text>Inclde source code</Text>
        <Text>{gigs[0].packages[2].sourceCode}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageContentView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  packageHeading: { fontSize: 18, fontWeight: '600' },
  PackagesTabsText: {
    color: 'gray',
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2.5,
    marginBottom: -1,
  },
});
