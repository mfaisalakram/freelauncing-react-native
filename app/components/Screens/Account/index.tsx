import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect, createContext } from 'react';
import { Image, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import colors from '../Utils/colors';
import MyFiverr from './account/MyFiverr';
import axios from 'axios';
import { baseUrl, baseUrlAssets } from '../../../shared/baseUrl';
import { useSelector } from 'react-redux';
import { getUserDetailsSelector } from '../../../store/detailInfo/selector';
import { getLoginUserSelector } from '../../../store/loginUser/selector';
import { useNavigation } from '@react-navigation/native';

const UserMode = createContext(true);
const AccountPage = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  const loginUser = useSelector(getLoginUserSelector);

  const [data, setData] = useState(useSelector(getUserDetailsSelector));

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

  const SwitchtoBuying = async () => {
    const response = await axios.get(`${baseUrl}api/auth/switch-to-buying`, {
      headers: {
        'x-auth-token': loginUser?.token,
      },
    });
  };
  const SwitchtoSelling = async () => {
    const response = await axios.get(`${baseUrl}api/auth/switch-to-selling`, {
      headers: {
        'x-auth-token': loginUser?.token,
      },
    });
  };
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled == true) {
      // SwitchtoBuying();
      navigation.navigate('Home', { type: 'Seller' });
    } else {
      // SwitchtoSelling();
      navigation.navigate('Home', { type: 'Buyer' });
    }
  };

  return (
    <UserMode.Provider value={isEnabled}>
      <View style={styles().container}>
        <View style={styles(isEnabled).headerArea}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 10 }}>
              <Image
                source={{
                  uri:
                    data?.username || data?.profile_image
                      ? `${baseUrlAssets}assets/uploads/users/${data?.username}/profileImages/${data?.profile_image}`
                      : `${baseUrlAssets}assets/uploads/imagePlaceholder.jpg`,
                }}
                style={styles().image}
              />

              <View style={styles().badge} />
            </View>
            <View>
              <Text style={styles().username}>
                {data?.fname} {data?.lname}
              </Text>
              <Text style={{ color: colors.white }}>
                Personal balance: $1000.00
              </Text>
            </View>
          </View>

          <Feather name="bell" size={27} color={colors.white} />
          <View style={styles().sellerModeArea}>
            <Text style={styles().sellerMode}>Seller mode</Text>
            <Switch
              trackColor={{ false: '#767577', true: colors.light }}
              thumbColor={isEnabled ? colors.primary : colors.gray}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        <View style={{ paddingTop: 20, flex: 1 }}>
          <MyFiverr />
        </View>
      </View>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />
    </UserMode.Provider>
  );
};

const styles = (mode?: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.bg,
      flex: 1,
    },
    headerArea: {
      backgroundColor: mode === true ? colors.primary : colors.secondary,
      paddingTop: 40,
      paddingBottom: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 30,
    },
    badge: {
      width: 14,
      height: 14,
      backgroundColor: colors.primary,
      borderRadius: 10,
      position: 'absolute',
      right: 0,
      bottom: 0,
      zIndex: 1,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    username: {
      color: colors.white,
      // fontFamily: 'RobotoMedium',
      fontSize: 18,
    },
    sellerMode: {
      // fontFamily: 'RobotoMedium',
      fontSize: 15,
    },
    sellerModeArea: {
      backgroundColor: colors.white,
      elevation: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 15,
      paddingRight: 5,
      borderRadius: 7,
      position: 'absolute',
      width: '100%',
      left: 10,
      bottom: -22,
    },
  });

export { UserMode };
export default AccountPage;
