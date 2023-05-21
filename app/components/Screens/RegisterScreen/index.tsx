import React, { useState, createRef, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import colors from '../Utils/colors';
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../../../shared/baseUrl';
import CustomSnackBar from '../../SnackBar';

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RegisterUserAC } from '../../../store/registerUser/actionCreator';
import {
  getRegisterUserSelector,
  getRegisterUserPendingSelector,
  getRegisterUserErrorSelector,
} from '../../../store/registerUser/selector';

import Spinner from '../../Spinner/Spinner';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [message, setMesssage] = useState('');

  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

  const navigation = useNavigation();

  const NavigateTo = (screen: any) => {
    const dt = {
      name: screen,
      key: undefined,
      params: { userRegistered: true },
      merge: undefined,
    } as any;
    navigation.navigate(dt);
  };

  const DAC = bindActionCreators(RegisterUserAC, dispatch);

  const registerUser = useSelector(getRegisterUserSelector);
  const registerUserError = useSelector(getRegisterUserErrorSelector);
  const registerUserPending = useSelector(getRegisterUserPendingSelector);

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/; // email
  let reg2 = /^(?=.*[A-Z]).{8,}$/; // password

  const regiserApi = () => {
    console.log('Register Dac');
    DAC.setRegisterUser({
      email: userEmail,
      password: userPassword,
      username: userName,
      fname: userFirstName,
      lname: userLastName,
    });
  };

  const checkEmail = async () => {
    if (userName === '') {
      setVisible(true);
      setMesssage('Username is Required');
      return;
    } else if (userEmail === '') {
      setVisible(true);
      setMesssage('Email is Required');
      return;
    } else if (reg.test(userEmail) === false) {
      setVisible(true);
      setMesssage('Email is not Valid');
    } else if (userPassword === '') {
      setVisible(true);
      setMesssage('Password is Required');
      return;
    } else if (userPassword.length < 8) {
      setVisible(true);
      setMesssage('Password must be at least 8 charaters');
    } else if (reg2.test(userPassword) === false) {
      setVisible(true);
      setMesssage('Password must have at least one capital letter');
    } else if (userFirstName === '') {
      setVisible(true);
      setMesssage('FirstName is Required');
      return;
    } else if (userLastName === '') {
      setVisible(true);
      setMesssage('LastName is Required');
      return;
    } else {
      const res = await axios.get(`${baseUrl}api/auth/checkemail/${userEmail}`);

      if (res.data.found === true) {
        setVisible(true);
        setMesssage('User with this email alreay exist');
        return;
      } else {
        console.log('register called');
        regiserApi();
        if (registerUser) {
          console.log('register navigate');

          NavigateTo('Login');
        } else {
          setVisible(true);
          setMesssage(registerUserError);
        }
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffff',
      }}
    >
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
          <Text style={styles.welcmeBack}>Welcome!</Text>
          <Text style={styles.welomeText}>
            Sign up to Fiverr to pick up exactly where you left off.
          </Text>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonFacebook} activeOpacity={0.5}>
              <Text style={styles.buttonTextStyle}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGoogle} activeOpacity={0.5}>
              <Text style={styles.buttonTextStyle}>Google</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.signinText}>or sign up with email</Text>
        </View>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userName) => setUserName(userName)}
                value={userName}
                underlineColorAndroid="#f000"
                placeholder="Enter UserName"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyleSmall}
                onChangeText={(firstName) => setUserFirstName(firstName)}
                value={userFirstName}
                underlineColorAndroid="#f000"
                placeholder="Enter FirstName"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
              <TextInput
                style={styles.inputStyleSmall}
                onChangeText={(lastName) => setUserLastName(lastName)}
                value={userLastName}
                underlineColorAndroid="#f000"
                placeholder="Enter FirstName"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                value={userEmail}
                underlineColorAndroid="#f000"
                placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                keyboardType="email-address"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                value={userPassword}
                underlineColorAndroid="#f000"
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                returnKeyType="next"
                secureTextEntry={true}
                blurOnSubmit={false}
              />
            </View>

            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => checkEmail()}
            >
              {registerUserPending ? (
                <Spinner />
              ) : (
                <Text style={styles.buttonTextStyle}>Register</Text>
              )}
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
export default Register;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    margin: 10,
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
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    paddingRight: 15,
    borderBottomWidth: 2,
    borderColor: '#dadae8',
    color: 'gray',
  },
  inputStyleSmall: {
    flex: 1,
    paddingRight: 15,
    borderBottomWidth: 2,
    borderColor: '#dadae8',
    color: 'gray',
    marginRight: 8,
    width: '100%',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
