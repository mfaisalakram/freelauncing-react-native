import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { MyProfile } from './Routes/MyProfile';

import { TeamRoster } from './Routes/TeamRoster';

import { useTheme } from '../../../../utils/themeContext';

const FirstRoute = () => <TeamRoster />;

const SecondRoute = () => <MyProfile />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function RosterTabView() {
  const layout = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Team Roster' },
    { key: 'second', title: ' My Profile' },
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
          style={{ backgroundColor: colors.background }}
          labelStyle={{
            fontSize: 12,
            color: '#262626',
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}
          activeColor={colors.text}
          inactiveColor="#949494"
          indicatorStyle={{
            backgroundColor: '#C72426',
            width: 45,
            marginLeft: '15%',
          }}
        />
      )}
    />
  );
}
