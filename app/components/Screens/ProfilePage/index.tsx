import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { displayWidth } from '../../../utils/commonFunctions';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../../Header';
import ProfileTabView from './tab-bar';
import { useTheme } from '../../../utils/themeContext';

export function ScheduleStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="ScheduleApp">
      <Stack.Screen
        name="ScheduleApp"
        children={() => <ProfilePage />}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function ProfilePage() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  const { colors, isDark } = useTheme();
  return (
    <>
      <View style={styles(colors.background).container}>
        <View></View>
        <ProfileTabView />
      </View>
    </>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
      flexDirection: 'column',
      width: displayWidth,
      flex: 1,
    },
    buttonsView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '3%',
    },
    coachView: {
      width: '40%',
      justifyContent: 'center',
      marginTop: 50,
      paddingLeft: 10,
    },
    coachText: {
      textAlign: 'center',
      fontSize: 18,
      color: color,
      fontWeight: 'bold',
      marginTop: 15,
    },
    icon: {
      alignItems: 'center',
      color: 'black',
      fontSize: 24,
      paddingTop: 7,
    },
    button: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#07243F',
      width: 84,
      height: 38,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    loginButton: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#F0F0F0',
      width: 280,
      height: 38,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    forgetText: {
      textAlign: 'center',
      color: '#07243F',
      paddingTop: 15,
      textDecorationLine: 'underline',
    },
    btnText: {
      color: '#fff',
    },
    loginTxt: {
      color: '#000',
    },
    text: {
      paddingBottom: 25,
    },
    imageView: {
      alignItems: 'center',
      marginTop: '1%',
      justifyContent: 'center',
    },
    image: { width: 60, height: 46 },
    fieldText: { padding: 8 },
    textName: {
      height: 42,
      width: '47%',
      backgroundColor: '#F0F0F0',
      paddingLeft: 10,
      borderRadius: 6,
      fontSize: 12,
      // fontWeight: 'bold',
      color: '#585858',
    },
    userName: {
      height: 42,
      width: '97%',
      backgroundColor: '#F0F0F0',
      paddingLeft: 10,
      borderRadius: 6,
      marginLeft: 5,
      fontSize: 12,
    },
  });
