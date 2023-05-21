import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { displayHeight, displayWidth } from '../../../utils/commonFunctions';

export function Reset() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {};
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image
            source={require('@app/assets/images/logo.png')}
            style={styles.image}
          />
        </View>
        <View>
          <View>
            <Text style={styles.fieldText}>Enter New Password:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUserName}
              value={userName}
              placeholder="Password"
              keyboardType="default"
            />
          </View>
          <View>
            <Text style={styles.fieldText}>Confirm New Password:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              keyboardType="default"
              secureTextEntry={true}
            />
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={{ color: '#fff' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: displayWidth,
    height: displayHeight,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#07243F',
    width: 118,
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
  text: {
    paddingBottom: 25,
  },
  input: {
    height: 42,
    width: '90%',
    backgroundColor: '#F0F0F0',
    alignSelf: 'center',
    paddingLeft: 10,
    borderRadius: 6,
    marginBottom: 15,
    color: '#585858',
  },
  fieldText: { paddingLeft: 20, paddingBottom: 8 },
  imageView: { alignItems: 'center', marginTop: '15%', marginBottom: 20 },
  image: { width: 250, height: 200 },
});
