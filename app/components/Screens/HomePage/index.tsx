import React, { useEffect, useState, useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';

import MyGig from '../../home/gigs/MyGig';
import Todo from '../../home/todos/Todo';
import Dashboard from '../../home/Dashboard';
import Earning from '../../home/earnings/Earning';
import Header from '../../Header';

import BuyerGigsList from '../../BuyerGigsList/BuyerGigsList';
import axios from 'axios';
import { baseUrl, baseUrlAssets } from '../../../shared/baseUrl';
import { GetUserDataAC } from '../../../store/detailInfo/actions';

import { getLoginUserSelector } from '../../../store/loginUser/selector';
import { getUserDetailsSelector } from '../../../store/detailInfo/selector';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import colors from '../Utils/colors';
import HomeHeader from './home-header';

import { UserMode } from '../Account';

import { useRoute } from '@react-navigation/native';

const HomePage = () => {
  const loginUser = useSelector(getLoginUserSelector);

  const userDetail = useSelector(getUserDetailsSelector);

  const dispatch = useDispatch();

  const DACAll = bindActionCreators(GetUserDataAC, dispatch);

  const route = useRoute();
  const rt = route?.params?.type;

  useEffect(() => {
    DACAll.currentUserDetails({
      user: {
        id: 0,
        username: '',
        fname: '',
        lname: '',
        email: '',
        profile_image: '',
        account_type: '',
        account_status: '',
        current_type: '',
      },
      pending: false,
      token: loginUser?.token,
      errorMessage: '',
    });
  }, []);

  return (
    <ScrollView>
      {rt === 'Seller' ? (
        <>
          <Text style={styles().serviceHEading}>Services </Text>
          <BuyerGigsList />
        </>
      ) : rt === undefined ? (
        <>
          <HomeHeader />
          <View>
            <Dashboard />
            <Earning />
            <Todo />
            <MyGig />
          </View>
        </>
      ) : (
        <>
          <HomeHeader />
          <View>
            <Dashboard />
            <Earning />
            <Todo />
            <MyGig />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default HomePage;
const styles = (mode?: any) =>
  StyleSheet.create({
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
    serviceHEading: {
      marginLeft: 20,
      fontSize: 28,
    },
  });
