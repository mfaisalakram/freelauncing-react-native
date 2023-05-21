import React, { useState, createRef, useRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import colors from '../Utils/colors';

import axios from 'axios';
import { baseUrl } from '../../../shared/baseUrl';

import { useNavigation, useRoute } from '@react-navigation/native';
import CustomSnackBar from '../../SnackBar';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { LoginUserAC } from '../../../store/loginUser/actions';
import {
  getLoginUserErrorSelector,
  getLoginUserPendingSelector,
  getLoginUserSelector,
} from '../../../store/loginUser/selector';
import { GetUserDataAC } from '../../../store/detailInfo/actions';

// import { GetUserDataAC } from '../../../store/detailInfo/actions';

const Login = () => {
  const route = useRoute();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [visible, setVisible] = useState(false);
  const [message, setMesssage] = useState('');

  const loginUser = useSelector(getLoginUserSelector);
  const loginUserError = useSelector(getLoginUserErrorSelector);
  const loginUserPending = useSelector(getLoginUserPendingSelector);
  const submitHit = useRef(false);
  const passwordInputRef = createRef();

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

  const DAC = bindActionCreators(LoginUserAC, dispatch);
  const DACAll = bindActionCreators(GetUserDataAC, dispatch);
  const Login = () => {
    if (userEmail === '') {
      setVisible(true);
      setMesssage('Email is Required');
      return;
    } else if (userPassword === '') {
      setVisible(true);
      setMesssage('Password is Required');
      return;
    } else {
      DAC.fetchUserRequest({
        email: userEmail,
        password: userPassword,
      });
      submitHit.current = true;
    }
  };

  useEffect(() => {
    if (submitHit.current === true) {
      if (loginUser?.found === false) {
        setVisible(true);
        setMesssage('Invelid Credentials');
        return;
      } else if (loginUser?.found === true) {
        navigateTo('Navigator');
        submitHit.current = false;
      }
    }
  }, [loginUserPending]);

  useEffect(() => {
    if (route?.params?.userRegistered === true) {
      setVisible(true);
      setMesssage('User Registered Successfully');
    } else {
      return;
    }
  }, []);

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
          <Text style={styles.welcmeBack}>Welcome Back</Text>
          <Text style={styles.welomeText}>
            Sign in to LoginAlpha to pick up exactly where you left off.
          </Text>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonFacebook} activeOpacity={0.5}>
              <Text style={styles.buttonTextStyle}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGoogle} activeOpacity={0.5}>
              <Text style={styles.buttonTextStyle}>Google</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.signinText}>or sign in with email</Text>
        </View>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userEmail) => setUserEmail(userEmail)}
                value={userEmail}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userPassword) => setUserPassword(userPassword)}
                value={userPassword}
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                Login();
                // DAC.loginUserClear();
              }}
            >
              <Text style={styles.buttonTextStyle}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.forgetbutton}
              onPress={() => navigateTo('Forget')}
            >
              <Text style={styles.forgetbuttonTextStyle}>
                Forget Password ?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigateTo('Register');
              }}
            >
              <Text style={styles.registerTextStyle}>
                New Here ?
                <Text style={{ color: colors.primary }}>Register</Text>
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        <CustomSnackBar
          message={message}
          visible={visible}
          setVisible={setVisible}
        />
      </ScrollView>
    </View>
  );
};
export default Login;

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
    marginTop: 10,
    fontWeight: '500',
    color: colors.secondary,
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
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
  },
  buttonGoogle: {
    backgroundColor: '#4E72E6',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 45,

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
    borderWidth: 0,
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
