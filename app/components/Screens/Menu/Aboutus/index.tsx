import React from 'react';
import { StyleSheet, Text, ScrollView, View,Image } from 'react-native';

import Header from '../../../Header';

import { useTheme } from '../../../../utils/themeContext';

export function Aboutus() {
  const { colors, isDark } = useTheme();

  return (
    <ScrollView style={styles(colors.background).container}>
  <Header  isDrawer={false}/>
  <Text style={styles(colors.heading).aboutHeading}>About Us</Text>

{/* <Text style = {styles().heading}>My Profile</Text>       */}
    <View style={styles(colors.profileContainerback).MainViewCoach}>
            <View>
              <Image
                style={styles().profilePic}
                source={require('../../../../../assets/images/Hassan.jpeg')}
              />
            </View>
          <View>
            <View
              style={{ right: 1, flexDirection: 'row', alignSelf: 'flex-end' }}
            >
            </View>
              
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Text style={styles(colors.profileNames).nameText}>
                  Hassan{' '}
                  </Text>
                  <Text style={styles(colors.profileNames).nameText}>
                  Ali
                  </Text>
                </View>
                <Text style={styles(colors.editButton).jerseyNum}>Roll No. 385</Text>
                <Text style={styles(colors.playerInfo).phone}>
                  Phone Number : 03154747894
                </Text>
                <Text style={styles(colors.playerInfo).email}>
                  Email : hali42978@gmail.com
                </Text>
           
          </View>

          
      
    </View>

    <View style={styles(colors.profileContainerback).MainViewCoach}>
            <View>
              <Image
                style={styles().profilePic}
                source={require('../../../../../assets/images/Haseeb.jpeg')}
              />
            </View>
          <View>
            <View
              style={{ right: 1, flexDirection: 'row', alignSelf: 'flex-end' }}
            >
            </View>
              
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Text style={styles(colors.profileNames).nameText}>
                    Muhammad{' '}
                  </Text>
                  <Text style={styles(colors.profileNames).nameText}>
                    Haseeb
                  </Text>
                </View>
                <Text style={styles(colors.editButton).jerseyNum}>Roll No. 385</Text>
                <Text style={styles(colors.playerInfo).phone}>
                  Phone Number : 0321-1404414
                </Text>
                <Text style={styles(colors.playerInfo).email}>
                  Email : Haseeb4304@gmail.com
                </Text>
           
          </View>

          
      
    </View>
    </ScrollView>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    heading:{
      fontSize:25 , alignItems:'center',alignSelf:'center'  , justifyContent:'center', marginTop:'20%'
    },
    container: {
      backgroundColor: 'white',
    },
    aboutHeading: {
      color: color,
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    MainViewCoach: {
      width: '92%',
      position: 'relative',
      marginTop: '20%',
      borderRadius:30,
      borderWidth: 0.01,
      borderColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 12,
      elevation: 15,
      padding: 15,
      display: 'flex',
      marginLeft: 15,
      backgroundColor: color,
      shadowOpacity: 0.6,
      marginBottom: 25,
    },
    profilePic: {
      width: 75,
      height: 75,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      zIndex: 3,
      opacity: 1,
      position: 'absolute',
      top: -60,
      overflow: 'hidden',
    },

    nameText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: color,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 35,
      alignItems: 'center',
      alignSelf: 'center',
    },
    jerseyNum: {
      fontSize: 18,
      color: color,
      marginTop: 6,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    teamName: {
      fontSize: 15,
      color: color,
      fontWeight: '500',
      marginBottom: 5,
    },
    phone: { color: color, fontSize: 14, marginBottom: 5 },
    email: { fontSize: 14, color: color, marginBottom: 10 },
    description: { fontSize: 14, color: color, marginBottom: 5 },
    button: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#07243F',
      width: 187,
      height: 38,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '25%',
    },
  });

