import * as React from 'react';
import { useWindowDimensions, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import Diamond from './Routes/diamond';
import Gold from './Routes/gold';
import Platinum from './Routes/platinum';

import colors from '../Utils/colors';

import { gigs } from '../GigsList';

export default function GigPackageTabView() {
  const layout = useWindowDimensions();

  const initialLayout = { width: Dimensions.get('window').width };

  const [index, setIndex] = React.useState(0);

  const FirstRoute = () => <Diamond />;
  const SecondRoute = () => <Gold />;
  const ThirdRoute = () => <Platinum />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const [routes] = React.useState([
    { key: 'first', title: `$ ${gigs[0].packages[0].price}` },
    { key: 'second', title: `$ ${gigs[0].packages[1].price}` },
    { key: 'third', title: `$ ${gigs[0].packages[2].price}` },
  ]);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
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
