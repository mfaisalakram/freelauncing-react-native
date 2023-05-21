import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../utils/themeContext';

interface Props {
  isDrawer?: boolean;
}
export default function ({ isDrawer = true }: Props) {
  const [showModal, setShowModal] = useState(true);
  const navigation = useNavigation();
  return (
    <Modal
      visible={showModal}
      transparent
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <View style={styles().centered_view}>
        <View style={styles().innerView}>
          <View style={styles().warningTitle}>
            <Text style={styles().warningTitleText}>Email Sent</Text>
          </View>
          <View style={styles().warningDec}>
            <Text style={styles().warningDecText}>
              Email Sent to you now Lorem, ipsum dolor sit amet consectetur
              adipisicing elit.
            </Text>
          </View>
          <View style={styles().buttonView}>
            <TouchableOpacity
              style={styles().button}
              onPress={() => {
                setShowModal(false);
                navigation.goBack();
              }}
            >
              <Text style={{ color: '#ffff' }}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    centered_view: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000099',
    },
    innerView: {
      backgroundColor: '#ffff',
      width: 300,
      height: 200,
      borderRadius: 20,
      elevation: 5,
      justifyContent: 'center',
    },
    warningTitle: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    warningTitleText: {
      fontSize: 16,
      color: '#262626',
      fontWeight: 'bold',
    },
    warningDec: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    warningDecText: {
      fontSize: 14,
      color: '#585858',
      textAlign: 'center',
    },
    buttonView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '5%',
    },
    button: {
      backgroundColor: '#07243F',
      width: 187,
      height: 38,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
