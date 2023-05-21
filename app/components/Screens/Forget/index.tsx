import React, { useState, createRef } from 'react';
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

import { useNavigation } from '@react-navigation/native';

const ForgetPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const navigatee = useNavigation();

  return (
    <View style={styles.mainBody}>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(UserEmail) => setUserEmail(UserEmail)}
          placeholder="Email"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
      </View>
      <Text style={styles.helpText}>
        Your confirmation link will be send to your email address.
      </Text>

      {errortext != '' ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}
      <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
        <Text style={styles.buttonTextStyle}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ForgetPage;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    // justifyContent: 'start',
    backgroundColor: '#ffff',
    alignContent: 'center',
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
    backgroundColor: colors.primary,
    borderWidth: 0,
    color: '#FFFFFF',
    height: 35,
    alignItems: 'center',
    borderRadius: 3,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
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

  helpText: {
    fontSize: 11,
    marginLeft: 15,
  },

  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
