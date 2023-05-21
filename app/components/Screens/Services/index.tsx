import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import Header from '../../Header';

import { useTheme } from '../../../utils/themeContext';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserDataAC } from '../../../store/detailInfo/actions';
import { bindActionCreators } from 'redux';
import { getLoginUserSelector } from '../../../store/loginUser/selector';
import { getUserDetailsSelector } from '../../../store/detailInfo/selector';

export function Service() {
  const { colors, isDark } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginUser = useSelector(getLoginUserSelector);

  const DACAll = bindActionCreators(GetUserDataAC, dispatch);
  const navigateTo = (screen: any) => {
    const dt = {
      name: screen,
      key: undefined,
      params: {},
      merge: undefined,
    } as any;
    navigation.navigate(dt);
  };
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
      token: loginUser.token,
      errorMessage: '',
    });
  }, []);

  const userdetail = useSelector(getUserDetailsSelector);
  console.log(userdetail);

  return (
    <>
      <Header />
      <View style={styles(colors.background).mainView}>
        <View>
          <Text style={styles(colors.heading).coachText}>Services</Text>
        </View>
        <ScrollView>
          <View>
            <Text style={styles(colors.heading).services}>Verification</Text>
          </View>
          <View style={styles().hr} />
          <View
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => {
                navigateTo('CharacterCertificateVerification');
              }}
            >
              <Image
                style={styles().image}
                source={require('../../../../assets/images/character-certificate.png')}
              />
              <Text style={styles().text}>Verify character Certificate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => {
                navigateTo('VerifyDocuments');
              }}
            >
              <Image
                style={styles().image}
                source={require('../../../../assets/images/character-certificate.png')}
              />
              <Text style={styles().text}>Verify Documents</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles(colors.heading).services}>Register</Text>
          </View>
          <View style={styles().hr} />
          <View
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => {
                navigateTo('RegisterFIR');
              }}
            >
              <Image
                style={styles().image}
                source={require('../../../../assets/images/character-certificate.png')}
              />
              <Text style={styles().text}>Register FIR</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles(colors.heading).services}>Status</Text>
          </View>
          <View style={styles().hr} />
          <View
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => [navigateTo('AllApplications')]}
            >
              <Image
                style={styles().image}
                source={require('../../../../assets/images/character-certificate.png')}
              />
              <Text style={styles().text1}>All Applications</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    mainView: {
      backgroundColor: color,
      flexDirection: 'column',
      padding: 12,
      flex: 1,
      borderColor: 'red',
    },
    hr: {
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: '3%',
    },
    coachText: {
      textAlign: 'center',
      fontSize: 18,
      color: color,
      fontWeight: 'bold',
    },
    services: {
      textAlign: 'left',
      fontSize: 16,
      color: '#27ce61',
      marginTop: '5%',
      fontWeight: 'bold',
    },
    aboutHeading: {
      color: color,
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    bold: {
      marginTop: 10,
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: 20,
      color: color,
    },
    text: {
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 16,
      width: '70%',
      // left:-10,
      color: color,
      lineHeight: 20,
    },
    text1: {
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 16,
      // width:"70%",
      // left:-10,
      color: color,
      lineHeight: 20,
    },
    image: {
      width: 75,
      height: 75,
      borderRadius: 50,
      justifyContent: 'center',
      zIndex: 3,
      margin: '5%',
      opacity: 1,
      overflow: 'hidden',
    },
  });
