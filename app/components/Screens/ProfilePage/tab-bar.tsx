import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import About from './Routes/about';
import Gigs from './Routes/gigs';
import Reviews from './Routes/reviews';

import colors from '../Utils/colors';

const FirstRoute = () => <About />;
const SecondRoute = () => <Gigs />;
const ThirdRoute = () => <Reviews />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function ProfileTabView() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'About' },
    { key: 'second', title: 'Gigs' },
    { key: 'third', title: 'Reviews' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: '#f0f0f0' }}
          labelStyle={{
            fontSize: 12,
            color: '#262626',
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}
          activeColor={colors.primary}
          inactiveColor="#949494"
          indicatorStyle={{
            backgroundColor: colors.primary,
            width: 45,
            marginLeft: '8.5%',
          }}
        />
      )}
    />
  );
}
