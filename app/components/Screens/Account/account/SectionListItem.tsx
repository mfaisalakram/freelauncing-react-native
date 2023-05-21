import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View, TouchableOpacity } from 'react-native';
import colors from '../../Utils/colors';
import { useNavigation } from '@react-navigation/native';

const SectionListItem = ({ title }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const navigation = useNavigation();
  const navigateTo = (screen: any) => {
    const dt = {
      name: screen,
      key: undefined,
      params: {},
      merge: undefined,
    } as any;
    navigation.navigate(dt);
  };

  // 'Earnings',
  //     'Buyer requests',
  //     'Custom offer templates',
  //     'Share Gigs',
  //     'My Profile',
  //     'Manage Gigs',

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (title === 'Manage Gigs') {
          navigateTo('GigsList');
        } else if (title === 'Buyer requests') {
          navigateTo('BuyerRquest');
        } else if (title === 'Earnings') {
          navigateTo('Earnings');
        } else if (title === 'Settings') {
          navigateTo('Setting');
        } else if (title === 'My Profile') {
          navigateTo('Profile');
        } else {
          return null;
        }
      }}
    >
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      {title === 'Show online status' ? (
        <Switch
          trackColor={{ false: '#767577', true: 'colors.light' }}
          thumbColor={isEnabled ? colors.primary : colors.gray}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      ) : (
        <Entypo name="chevron-small-right" size={27} color={colors.gray} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  title: {
    // fontFamily: 'RobotoMedium',
  },
});

export default SectionListItem;
