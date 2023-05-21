import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../Screens/Utils/colors';

const Option = ({ leftText, rightText, style }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{leftText}</Text>
      <Text style={[styles.text, style]}>{rightText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  text: {
    color: colors.white,
  },
});

export default Option;
