import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { displayHeight, displayWidth } from '../../../utils/commonFunctions';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTheme } from '../../../utils/themeContext';
import CustomSnackBar from '../../SnackBar';
import { getData } from '../../../store/AcceptInvitePlayer/selector';
import { RegisterPlayerAC } from '../../../store/registerPlayer/actionCreator';
import {
  getRegisterPlayerErrorSelector,
  getRegisterPlayerPendingSelector,
  getRegisterPlayerSelector,
} from '../../../store/registerPlayer/selector';

export function RegisterPlayer() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confrmpassword, setConfrmPassword] = useState('');
  const dispatch = useDispatch();
  const DAC = bindActionCreators(RegisterPlayerAC, dispatch);

  const submitHit = useRef(false);
  const [toLogin, setToLogin] = useState(false);

  const { colors, isDark } = useTheme();
  const data = useSelector(getData);
  const RegisterData = useSelector(getRegisterPlayerSelector);
  const RegisterPending = useSelector(getRegisterPlayerPendingSelector);
  const RegisterError = useSelector(getRegisterPlayerErrorSelector);

  const [visible, setVisible] = React.useState(false);
  const [message, setMesssage] = React.useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    if (password === confrmpassword) {
      if (userName !== '') {
        submitHit.current = true;
        DAC.setRegisterPlayer({
          user_name: userName,
          password: password,
          player_id: data.player_id,
          coach_id: data.coach_id,
        });
      } else {
        setVisible(true);
        setMesssage('Username is required');
      }
    } else {
      Alert.alert(
        'InCorrect Password ',
        'You have entered the incorrect confirm password please enter the correct password ',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    }
  };

  //UseEffects
  useEffect(() => {
    if (RegisterPending === true) {
      return;
    } else {
      if (submitHit.current === true) {
        if (RegisterError !== '') {
          setVisible(true);
          setMesssage("Sorry! can't register this player");
          return;
        } else if (RegisterData.user_name === userName) {
          setVisible(true);
          setMesssage('Account Created Successfully');
          setToLogin(true);
          // DACAll.GetUserDataClear()
        }
        submitHit.current = false;
      }
      submitHit.current = false;
    }
  }, [RegisterData]);

  if (toLogin) {
    navigation.navigate('Login');
  }

  return (
    <View style={styles(colors.background).container}>
      <KeyboardAwareScrollView>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={styles().coachView}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={28}
              color={isDark ? '#ffff' : '#07243F'}
              onPress={goBack}
            />
          </View>
          <View style={styles().imageView}>
            <Image
              source={
                isDark
                  ? require('@app/assets/images/darklogo.png')
                  : require('@app/assets/images/mini-logo.png')
              }
              style={styles().image}
            />
          </View>
        </View>
        <View>
          <Text style={styles(colors.heading).coachText}>
            Register as a Player
          </Text>
          <View style={{ padding: 15 }}>
            <View>
              <Text style={styles(colors.heading).fieldText}>
                Enter User Name:
              </Text>
              <TextInput
                style={
                  styles(colors.loginLandingBack, colors.loginInputTextColor)
                    .userName
                }
                onChangeText={setUserName}
                value={userName}
                placeholder="User Name"
                keyboardType="default"
                placeholderTextColor={isDark ? '#a8abb6' : '#585858'}
              />
            </View>
            <View>
              <Text style={styles(colors.heading).fieldText}>
                Enter Password:
              </Text>
              <TextInput
                secureTextEntry={true}
                style={
                  styles(colors.loginLandingBack, colors.loginInputTextColor)
                    .userName
                }
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                keyboardType="default"
                placeholderTextColor={isDark ? '#a8abb6' : '#585858'}
              />
            </View>
            <View>
              <Text style={styles(colors.heading).fieldText}>
                Enter Confirm Password:
              </Text>
              <TextInput
                secureTextEntry={true}
                style={
                  styles(colors.loginLandingBack, colors.loginInputTextColor)
                    .userName
                }
                onChangeText={setConfrmPassword}
                value={confrmpassword}
                placeholder="Password"
                keyboardType="default"
                placeholderTextColor={isDark ? '#a8abb6' : '#585858'}
              />
            </View>
          </View>
        </View>
        <View style={styles().buttonsView}>
          <TouchableOpacity style={styles().button} onPress={handleSubmit}>
            <Text style={styles().btnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <View>
        <CustomSnackBar
          message={message}
          visible={visible}
          setVisible={setVisible}
        />
      </View>
    </View>
  );
}

const styles = (color?: string, textColor?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
      flexDirection: 'column',
      width: displayWidth,
      height: displayHeight,
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
      marginTop: '10%',
      justifyContent: 'center',
      resizeMode: 'contain',
    },
    image: { width: 60, height: 46 },
    fieldText: { padding: 8, color: color },
    textName: {
      height: 42,
      width: '47%',
      backgroundColor: color,
      paddingLeft: 10,
      borderRadius: 6,
      fontSize: 12,
      // fontWeight: 'bold',
      color: textColor,
    },
    userName: {
      color: textColor,
      height: 42,
      width: '97%',
      backgroundColor: color,
      paddingLeft: 10,
      borderRadius: 6,
      marginLeft: 5,
      fontSize: 12,
    },
  });
