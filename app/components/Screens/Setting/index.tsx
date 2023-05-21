import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../Utils/colors';
import { useNavigation } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoginUserErrorSelector,
  getLoginUserPendingSelector,
  getLoginUserSelector,
} from '../../../store/loginUser/selector';
import { LoginUserAC } from '../../../store/loginUser/actions';
const SettingPage = () => {
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

  const dispatch = useDispatch();

  const loginUserError = useSelector(getLoginUserErrorSelector);
  const DAC = bindActionCreators(LoginUserAC, dispatch);
  const logout = () => {
    DAC.loginUserClear();
    navigateTo('Main');
  };
  return (
    <View>
      <TouchableOpacity style={styles().singleItemView}>
        <Text>Terms of services</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles().singleItemView}>
        <Text>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles().singleItemView}
        onPress={() => logout()}
      >
        <Text style={styles().logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingPage;
const styles = (color?: string) =>
  StyleSheet.create({
    singleItemView: {
      paddingVertical: 20,
      paddingHorizontal: 10,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
    },
    logoutText: {
      color: colors.danger,
    },
  });
