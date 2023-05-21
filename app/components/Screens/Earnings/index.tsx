import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import colors from '../Utils/colors';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Earning in August',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Avg. selling price',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Completed Orders',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const renderItem = ({ item }) => <Item title={item.title} />;
const EarningsPage = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}
    >
      <View style={styles.personalBalance}>
        <Text style={styles.price}>$100.00</Text>
        <Text style={styles.priceText}>Personal Balance</Text>
      </View>

      <View style={styles.analytics}>
        <Text style={styles.branding}>Analytics</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default EarningsPage;

const styles = StyleSheet.create({
  personalBalance: {
    width: '100%',
    justifyContent: 'center',
    height: 100,
    alignItems: 'center',
  },
  price: { color: colors.primary, fontWeight: 'bold', fontSize: 30 },
  priceText: { fontSize: 16 },
  analytics: {
    width: '100%',
  },
  branding: {
    fontSize: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
  },
  item: {
    padding: 5,
  },
  title: {
    fontSize: 15,
  },
});
