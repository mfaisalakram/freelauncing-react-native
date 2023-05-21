import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { displayHeight, displayWidth } from '../../../utils/commonFunctions';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../utils/themeContext';


export function PlayerTerms() {
  const { colors, isDark } = useTheme();
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
  const goBack = () => {
    navigation.goBack();
  };

  const navigate = () => {
    navigateTo('AcceptInvite');
  };
  return (
    <View style={styles(colors.background).container}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={styles().termsView}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={28}
            color={isDark ? '#ffff' : '#07243F'}
            onPress={goBack}
          />
        </View>
      </View>
      <View>
        <Text style={styles(colors.heading).termsTextView}>
          Getting Started
        </Text>
        <View style={styles().imageView}>
          <Image
            source={
              isDark
                ? require('@app/assets/images/main-white.png')
                : require('@app/assets/images/mini-logo.png')
            }
            style={styles().image}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <View>
            <Text style={styles(colors.readourText).termsTextTwo}>
              Read our{' '}
            </Text>
            <Text
              style={styles(colors.linkColor).links}
              onPress={() => {
                Linking.openURL(
                  'https://drive.google.com/file/d/19DVVuuPn-GErEEgdEMo-2EDdJjQJBpKA/view?usp=sharing'
                );
              }}
            >
              Privacy Policy.
            </Text>
          </View>
          <View>
            <Text style={styles(colors.heading).fieldText}>
              Tap "Agree & Continue" to accept the{' '}
            </Text>
            <Text
              style={styles(colors.linkColor).links}
              onPress={() => {
                Linking.openURL(
                  'https://drive.google.com/file/d/1a6VjrWICY6V3HzxJZVeq6Ujg4WC1GEnO/view?usp=sharing'
                );
              }}
            >
              Terms of Service.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles().buttonsView}>
        <TouchableOpacity style={styles().button} onPress={navigate}>
          <Text style={styles().btnText}>Accept & Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
      flexDirection: 'column',
      width: displayWidth,
      height: displayHeight,
    },
    fieldText: { color: color },
    links: { color: '#027ebf', textAlign: 'center' },
    termsView: {
      width: '40%',
      justifyContent: 'center',
      marginTop: 50,
      paddingLeft: 15,
    },
    termsTextView: {
      textAlign: 'center',
      fontSize: 18,
      color: color,
      fontWeight: 'bold',
      marginTop: 15,
    },
    termsTextOne: {
      width: '85%',
      alignSelf: 'center',
      color: '#262626',
      fontSize: 14,
      lineHeight: 16.41,
      marginTop: 30,
    },
    termsTextTwo: {
      width: '85%',
      alignSelf: 'center',
      color: color,
      fontSize: 14,
      lineHeight: 16.41,
      marginTop: 20,
    },
    buttonsView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '15%',
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
      width: 200,
      height: 38,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },

    btnText: {
      color: '#fff',
    },
    text: {
      paddingBottom: 25,
    },
    imageView: {
      alignItems: 'center',
      marginTop: '10%',
      justifyContent: 'center',
    },
    image: { width: 150, height: 120 },
  });
