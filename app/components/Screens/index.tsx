import React from 'react';

import MainStackNavigator from '../BottomNavigator';
import Login from './LoginScreen/index';
import ForgetPage from './Forget';
import LandingPage from './LandingScreen';
import InboxPage from './Inbox';
import Register from './RegisterScreen';
import ChatBox from './Inbox/ChatBox';
import ManageOrdersPage from './ManageOrders';
import AccountPage from './Account';
import GigsListPage from './GigsList';
import GigDetailPage from './GigDetail';
import BuyerRequestPage from './BuyerRequest';
import EarningsPage from './Earnings';
import SettingPage from './Setting';

import { ProfilePage } from './ProfilePage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ChangePassword } from './ChangePassword';
import SingleOrder from './SingleOrder';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={LandingPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Forget"
          component={ForgetPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Inbox"
          component={InboxPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ChatBox"
          component={ChatBox}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageOrders"
          component={ManageOrdersPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="SingleOrder"
          component={SingleOrder}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Account"
          component={AccountPage}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Profile"
          component={ProfilePage}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="GigsList"
          component={GigsListPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="GigDetail"
          component={GigDetailPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="BuyerRquest"
          component={BuyerRequestPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Earnings"
          component={EarningsPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Navigator"
          component={MainStackNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
