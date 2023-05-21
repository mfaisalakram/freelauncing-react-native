import React, { useEffect, useState } from 'react';
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

const HomeHeader = () => {
  const [servicesData, setServicesData] = useState({});
  const loginUser = useSelector(getLoginUserSelector);

  const data = useSelector(getUserDetailsSelector);

  useEffect(() => {
    async () => {
      const response = await axios.get(baseUrl + '/api/service/search');
      setServicesData(response.data.service);
    };
  }, []);

  const dispatch = useDispatch();

  const DACAll = bindActionCreators(GetUserDataAC, dispatch);

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
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <Text>{data?.username}</Text>
      <View>
        <Image
          source={{
            uri: `${baseUrlAssets}assets/uploads/users/${data?.username}/profileImages/${data?.profile_image}`,
          }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <View style={styles().badge} />
      </View>
    </View>
  );
};

export default HomeHeader;
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
  });
