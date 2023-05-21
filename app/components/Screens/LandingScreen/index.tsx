import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../Utils/colors';

import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getLoginUserSelector } from '../../../store/loginUser/selector';
import { loginUserApi } from '../../../store/loginUser/saga';

const LandingPage = () => {
  const loginUser = useSelector(getLoginUserSelector);

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

  // useEffect(() => {
  //   if (loginUser.token !== null && loginUser.found === true) {
  //     navigateTo('Navigator');
  //   } else {
  //     return;
  //   }
  // }, []);

  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../../../assets/images/logo/alpha.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 0,
            }}
          />
        </View>
        <View style={styles.mainBodyTop}>
          <Text style={styles.welcmeBack}>Join alphawork</Text>
          <Text style={styles.welomeText}>
            Join our growing freelaunce community to offer your
            awesoprofessional services, connect with customer, and get paid on
            alphawork's trusted platform.
          </Text>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonFacebook} activeOpacity={0.5}>
              <Text style={styles.buttonTextStyle}>Continue with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGoogle} activeOpacity={0.5}>
              <Text style={styles.buttonTextStyle}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSignup}
              activeOpacity={0.5}
              onPress={() => {
                navigateTo('Register');
              }}
            >
              <Text style={styles.buttonTextStyle}>Signup with Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Text style={styles.signinText}>
        By joining, you agree to Fiverr's{' '}
        <Text style={{ color: colors.primary }}>Terms of Service</Text>
      </Text>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ marginLeft: 15, marginVertical: 10 }}
      >
        <Text
          style={{ color: colors.primary }}
          onPress={() => {
            navigateTo('Login');
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default LandingPage;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
    alignContent: 'center',
  },
  mainBodyTop: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    margin: 10,
  },
  welcmeBack: { fontWeight: '500', fontSize: 18 },
  welomeText: { fontSize: 12, fontWeight: '500', color: colors.secondary },
  signinText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: colors.secondary,
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 40,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonFacebook: {
    backgroundColor: '#3B5999',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 45,
    borderRadius: 3,
    marginTop: 10,
  },
  buttonGoogle: {
    backgroundColor: '#4E72E6',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 45,
    marginTop: 10,
    borderRadius: 3,
  },
  buttonSignup: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    color: '#FFFFFF',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 45,
    marginTop: 10,
    borderRadius: 3,
  },

  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#F7BE6D',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 3,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 15,
  },
  inputStyle: {
    flex: 1,
    color: 'gray',
    paddingRight: 15,
    borderBottomWidth: 2,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 13,
    alignSelf: 'center',
  },
  registerText: {
    color: colors.primary,
  },
  forgetbutton: { textAlign: 'right', marginRight: 15 },
  forgetbuttonTextStyle: {
    color: colors.primary,
    textAlign: 'right',
    fontWeight: '500',
    fontSize: 13,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
