import React from 'react';
import { StyleSheet, Text, ScrollView, View,Image } from 'react-native';

import Header from '../../../Header';

import { useTheme } from '../../../../utils/themeContext';
import { Starts } from './Star';

export function Testimonials() {
  const { colors, isDark } = useTheme();

  return (
    <ScrollView style={styles(colors.background).container}>
  <Header  isDrawer={false}/>
  <Text style={styles(colors.heading).aboutHeading}>Testimonials</Text>

{/* <Text style = {styles().heading}>My Profile</Text>       */}
    <View style={styles(colors.profileContainerback).MainViewCoach}>
            <View>
              <Image
                style={styles().profilePic}
                source={require('assets/images/user.png')}
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
                    user{' '}
                  </Text>
                  <Text style={styles(colors.profileNames).nameText}>
                    name
                  </Text>
                </View>
                <Text style={styles(colors.playerInfo).phone}>
                  Over all though it was a great experience and we have had lots of great feedback. We already started promoting our next event and I have been approached by 4 other companies who want to know more about it as they want to use it for their own events.',
              author: 'Sarah M., Director of Events
                </Text>
                <Starts value={6}/>
           
          </View>

          
      
    </View>

    <View style={styles(colors.profileContainerback).MainViewCoach}>
            <View>
              <Image
                style={styles().profilePic}
                source={require('assets/images/user.png')}
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
                    user{' '}
                  </Text>
                  <Text style={styles(colors.profileNames).nameText}>
                    name
                  </Text>
                </View>
                <Text style={styles(colors.playerInfo).phone}>
                  Over all though it was a great experience and we have had lots of great feedback. We already started promoting our next event and I have been approached by 4 other companies who want to know more about it as they want to use it for their own events.',
              author: 'Sarah M., Director of Events
                </Text>
                <Starts value={6}/>
           
          </View>

          
      
    </View>

    <View style={styles(colors.profileContainerback).MainViewCoach}>
            <View>
              <Image
                style={styles().profilePic}
                source={require('assets/images/user.png')}
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
                    user{' '}
                  </Text>
                  <Text style={styles(colors.profileNames).nameText}>
                    name
                  </Text>
                </View>
                <Text style={styles(colors.playerInfo).phone}>
                  Over all though it was a great experience and we have had lots of great feedback. We already started promoting our next event and I have been approached by 4 other companies who want to know more about it as they want to use it for their own events.',
              author: 'Sarah M., Director of Events
                </Text>
                <Starts value={6}/>
           
          </View>

          
      
    </View>

    <View style={styles(colors.profileContainerback).MainViewCoach}>
            <View>
              <Image
                style={styles().profilePic}
                source={require('assets/images/user.png')}
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
                    user{' '}
                  </Text>
                  <Text style={styles(colors.profileNames).nameText}>
                    name
                  </Text>
                </View>
                <Text style={styles(colors.playerInfo).phone}>
                  Over all though it was a great experience and we have had lots of great feedback. We already started promoting our next event and I have been approached by 4 other companies who want to know more about it as they want to use it for their own events.',
              author: 'Sarah M., Director of Events
                </Text>
                <Starts value={6}/>
           
          </View>

          
      
    </View>
    <View style={styles(colors.profileContainerback).MainViewCoach}>
            <View>
              <Image
                style={styles().profilePic}
                source={require('assets/images/user.png')}
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
                    user{' '}
                  </Text>
                  <Text style={styles(colors.profileNames).nameText}>
                    name
                  </Text>
                </View>
                <Text style={styles(colors.playerInfo).phone}>
                  Over all though it was a great experience and we have had lots of great feedback. We already started promoting our next event and I have been approached by 4 other companies who want to know more about it as they want to use it for their own events.',
              author: 'Sarah M., Director of Events
                </Text>
                <Starts value={6}/>
           
          </View>

          
      
    </View>

    <View style={styles(colors.profileContainerback).MainViewCoach}>
            <View>
              <Image
                style={styles().profilePic}
                source={require('assets/images/user.png')}
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
                    user{' '}
                  </Text>
                  <Text style={styles(colors.profileNames).nameText}>
                    name
                  </Text>
                </View>
                <Text style={styles(colors.playerInfo).phone}>
                  Over all though it was a great experience and we have had lots of great feedback. We already started promoting our next event and I have been approached by 4 other companies who want to know more about it as they want to use it for their own events.',
              author: 'Sarah M., Director of Events
                </Text>
                <Starts value={6}/>
           
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
      borderWidth: 0.01,
      borderColor: 'white',
      display: 'flex',
      marginLeft: 15,
      backgroundColor: color,
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
    phone: { color: color, fontSize: 14, marginBottom: 5,textAlign:'center' ,alignItems:'center' },
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

