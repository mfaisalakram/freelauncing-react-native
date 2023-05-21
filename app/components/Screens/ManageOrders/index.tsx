import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import Active from './Active';
import colors from '../Utils/colors';

const Revision = () => <View style={{ flex: 1, backgroundColor: colors.bg }} />;

const Waiting = () => <View style={{ flex: 1, backgroundColor: colors.bg }} />;

const Completed = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: colors.bg,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>no order completed yet</Text>
  </View>
);

const Cancelled = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: colors.bg,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>no order cancelled yet</Text>
  </View>
);

const renderTabBar = (props) => (
  <TabBar
    {...props}
    tabStyle={{ width: 'auto' }}
    activeColor={colors.primary}
    inactiveColor={colors.secondary}
    scrollEnabled={true}
    indicatorStyle={{ backgroundColor: colors.primary }}
    style={{ backgroundColor: colors.white }}
    labelStyle={{ textTransform: 'capitalize' }}
  />
);

const ManageOrderPage = () => {
  const initialLayout = { width: Dimensions.get('window').width };

  const [index, setIndex] = React.useState(0);
  const [routes] = useState([
    { key: 'active', title: 'Active' },
    { key: 'completed', title: 'Completed' },
    { key: 'cancelled', title: 'Cancelled' },
  ]);

  const renderScene = SceneMap({
    active: Active,
    completed: Completed,
    cancelled: Cancelled,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  scene: {
    flex: 1,
  },
});

export default ManageOrderPage;
