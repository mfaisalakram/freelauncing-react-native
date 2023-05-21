import { bindActionCreators } from 'redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef, useEffect, useState } from 'react';
import { Dimensions, Animated } from 'react-native';

import { useTheme } from '../../utils/themeContext';
import { useSelector, useDispatch } from 'react-redux';

import { Menu } from '../Screens/Menu';
import { Media } from '../Screens/media';
import { Center } from '../Screens/center';
import { QuickAccess } from '../Screens/QuickAccess';
import HomePage from '../Screens/HomePage';
import Inbox from '../Screens/Inbox';
import ManageOrdersPage from '../Screens/ManageOrders';
import AccountPage from '../Screens/Account';

import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import colors from '../Screens/Utils/colors';

export default function MainStackNavigator() {
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  const { isDark } = useTheme();

  const tabOffsetValue = useRef(new Animated.Value(5)).current;
  let backroundNav;
  let activeTint;
  let inactiveTint;

  function getWidth() {
    let width = Dimensions.get('window').width;
    width = width;
    return width / 4;
  }
  const [delay, setDelay] = useState<number>(10000);
  const [count, setCount] = useState<number>(0);

  if (!isDark) {
    backroundNav = '#ffff';
    activeTint = '#07243f';
    inactiveTint = '#4d4d4d';
  } else {
    backroundNav = '#07243f';
    activeTint = '#ffff';
    inactiveTint = '#5B829C';
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#F7BE6D',
          tabBarInactiveTintColor: '#303030',
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Inbox"
          component={Inbox}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="mail" size={size} color={color} />
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name="ManageOrders"
          component={ManageOrdersPage}
          options={{
            tabBarIcon: ({ size, color }) => (
              <FontAwesome5 name="clipboard-list" size={size} color={color} />
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Account"
          component={AccountPage}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={size}
                color={color}
              />
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          backgroundColor: colors.primary,
          height: 2,
          width: getWidth() - 40,
          position: 'absolute',
          bottom: 49,
          left: 20,
          transform: [
            {
              translateX: tabOffsetValue,
            },
          ],
        }}
      ></Animated.View>
    </>
  );
}
