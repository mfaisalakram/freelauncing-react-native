import { SvgDrawer } from '../../../assets/icons/svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../utils/themeContext';

interface Props {
  isDrawer?: boolean;
}
export default function({ isDrawer = true }: Props) {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();

  const toggle = () => navigation.dispatch(DrawerActions.toggleDrawer());
  const goBack = () => navigation.goBack();

  return (
    <View style={styles(colors.background).container}>
      <View style={styles().coachView}>
        {isDrawer ? (
          <></>
        ) : (
          <TouchableOpacity onPress={goBack} style={styles().toggle}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={28}
              style={styles(colors.text).icon}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles().imageView}>
        <Image
          source={require('@app/assets/images/logo2.png')}
          style={styles().image}
        />
      </View>
    </View>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: color,
      paddingBottom: '2%',
    },
    toggle: {
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    coachView: {
      width: '40%',
      justifyContent: 'center',
      paddingLeft: 10,
      paddingTop: 45,
    },
    imageView: {
      alignItems: 'center',
      marginTop: '10%',
      justifyContent: 'center',
      marginLeft: '1.5%',
      // marginBottom: '20',
    },
    image: { width: 60, height: 46, resizeMode: 'contain' },
    icon: { color: color },
  });
