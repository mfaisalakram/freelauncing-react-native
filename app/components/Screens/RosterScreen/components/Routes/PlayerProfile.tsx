import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginUserSelector } from '../../../../../store/loginUser/selector';
import { bindActionCreators } from 'redux';
import { GetPlayerAC } from '../../../../../store/getPlayers/actionCreator';
import {
  getGetPlayerPendingSelector,
  getGetPlayerSelector,
} from '../../../../../store/getPlayers/selector';
import { getUserDetailsSelector } from '../../../../../store/detailInfo/selector';
import { ActivityIndicator } from 'react-native-paper';

import { useTheme } from '../../../../../utils/themeContext';
import { SimpleLineIcons } from '@expo/vector-icons';
import { GetPlayerProfilesSelector } from '../../../../../store/getPlayerData/selector';
import Header from '../../../../Header';
import moment from 'moment';
import { getCoachGetOwnTeamSelector } from '../../../../../store/getCoachTeam/coach_get_own_team';

export function PlayerProfile() {
  const { colors, isDark } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const navigateTo = (screen: any) => {
    const dt = {
      name: screen,
      key: undefined,
      params: { id: route.params.id },
      merge: undefined,
    } as any;
    navigation.navigate(dt);
  };

  const profile = useSelector(getGetPlayerSelector);
  const coachData = useSelector(getCoachGetOwnTeamSelector);

  const profilePending = useSelector(getGetPlayerPendingSelector);
  const user = useSelector(getLoginUserSelector);
  const userDetails = useSelector(getUserDetailsSelector);
  const dispatch = useDispatch();
  const DAC = bindActionCreators(GetPlayerAC, dispatch);
  const GetPlayer = useSelector(GetPlayerProfilesSelector);

  useEffect(() => {
    try {
      if (route.params && route.params.id !== '') {
        DAC.setGetPlayer(route.params.id, user.access_token);
      }
    } catch (err) {
      console.log('error in myProfile component', err);
    }
  }, []);

  const loading = (
    <ActivityIndicator
      color={isDark ? '#ffff' : '#07243f'}
      style={{ marginTop: '25%' }}
    />
  );
  return (
    <View style={styles(colors.background).container}>
      <Header isDrawer={false} />
      <View>
        <Text style={styles(colors.heading).coachText}>Player Details</Text>
      </View>

      <View style={styles(colors.profileContainerback).MainViewCoach}>
        {userDetails.role_id === 2 ? (
          <View
            style={{
              right: 5,
              position: 'absolute',
              top: 5,
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigateTo('UpdatePlayerData');
              }}
            >
              <SimpleLineIcons
                name="pencil"
                size={16}
                color={isDark ? '#ffff' : '#07243f'}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        {profile[0].first_name !== '' ? (
          <>
            {profile[0].user_image_url ? (
              <View style={styles().profilePic}>
                <Image
                  source={{ uri: profile[0].user_image_url }}
                  style={{ height: 75, width: 75 }}
                />
              </View>
            ) : (
              <View>
                <Image
                  style={styles().profilePic}
                  source={require('assets/images/user.png')}
                />
              </View>
            )}
            <View>
              {profilePending ? (
                <View>{loading}</View>
              ) : profile ? (
                <>
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                  >
                    <Text style={styles(colors.profileNames).nameText}>
                      {profile[0].user.first_name}
                    </Text>
                    <Text style={styles(colors.profileNames).nameText}>
                      {' '}
                      {profile[0].user.last_name}
                    </Text>
                  </View>
                  <View>
                    {profile[0].user_team_detail.position.toUpperCase() ===
                      'RIGHTWING' ||
                    profile[0].user_team_detail.position.toUpperCase() ===
                      'LEFTWING' ||
                    profile[0].user_team_detail.position.toUpperCase() ===
                      'CENTER' ||
                    profile[0].user_team_detail.position.toUpperCase() ===
                      'CENTRE' ||
                    profile[0].user_team_detail.position.toUpperCase() ===
                      'STRING' ||
                    profile[0].user_team_detail.position.toUpperCase() ===
                      'FORWARD' ? (
                      <Text style={styles(colors.editButton).jerseyNum}>
                        Position: Forward
                      </Text>
                    ) : profile[0].user_team_detail.position.toUpperCase() ===
                      'DEFENSE' ? (
                      <Text style={styles(colors.editButton).jerseyNum}>
                        Position: Defense
                      </Text>
                    ) : profile[0].user_team_detail.position.toUpperCase() ===
                      'GOALIE' ? (
                      <Text style={styles(colors.editButton).jerseyNum}>
                        Position: Goalie
                      </Text>
                    ) : null}

                    <Text style={styles(colors.editButton).jerseyNum}>
                      Jersey# : {profile[0].user_team_detail.jersey.slice(0, 2)}
                    </Text>
                    <Text style={styles(colors.playerInfo).teamName}>
                      Team: {profile[0].user_team_name}
                    </Text>
                  </View>
                  <Text style={styles(colors.playerInfo).phone}>
                    Phone Number: {profile[0].user.phone_number}
                  </Text>
                  <Text style={styles(colors.playerInfo).email}>
                    Email: {profile[0].user.email}
                  </Text>
                  {coachData?.team_detail.birthdate === true ? (
                    <Text style={styles(colors.playerInfo).email}>
                      Date of Birth:{' '}
                      {moment(profile[0].user_team_detail.birthdate).format(
                        'DD-MM-YYYY'
                      )}
                    </Text>
                  ) : null}
                  {coachData?.team_detail.hometown === true ? (
                    <Text style={styles(colors.playerInfo).email}>
                      Home Town: {profile[0].user_team_detail.hometown}
                    </Text>
                  ) : (
                    <></>
                  )}
                  {coachData?.team_detail.shoots === true ? (
                    <Text style={styles(colors.playerInfo).email}>
                      Shoots:{' '}
                      {profile[0].user_team_detail.shoots === 'right'
                        ? 'Right'
                        : 'Left'}
                    </Text>
                  ) : (
                    <></>
                  )}
                  {coachData?.team_detail.weight === true ? (
                    <Text style={styles(colors.playerInfo).email}>
                      Weight: {profile[0].user_team_detail.weight} lbs
                    </Text>
                  ) : (
                    <></>
                  )}
                  {coachData?.team_detail.height === true ? (
                    <Text style={styles(colors.playerInfo).email}>
                      Height: {profile[0].user_team_detail.height} ft
                    </Text>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <Text>Error</Text>
              )}
            </View>
          </>
        ) : (
          <View>{loading}</View>
        )}
      </View>
    </View>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
      flex: 1,
    },
    MainViewCoach: {
      width: '92%',
      position: 'relative',
      marginTop: '20%',
      borderWidth: 0.01,
      borderColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.6,

      shadowRadius: 2.22,
      elevation: 3,
      padding: 15,
      display: 'flex',
      marginLeft: 15,
      backgroundColor: color,
    },
    profilePic: {
      width: 75,
      height: 75,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      opacity: 1,
      // elevation: 3,
      position: 'absolute',
      top: -50,
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
    coachText: {
      textAlign: 'center',
      fontSize: 18,
      color: color,
      fontWeight: 'bold',
      marginTop: 15,
    },
  });
