import React, { useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import { GetUserDataAC } from '../../../../../store/detailInfo/actions';
import { UpdatePlayerProfilesPendingSelector } from '../../../../../store/updateProfile/selector';
import { GetPlayerDatasAC } from '../../../../../store/getPlayerData/actionCreator';
import { GetPlayerProfilesSelector } from '../../../../../store/getPlayerData/selector';
import { UpdatePlayerProfileDataPendingSelector } from '../../../../../store/updatePlayerData/selector';
import moment from 'moment';
import { getCoachGetOwnTeamSelector } from '../../../../../store/getCoachTeam/coach_get_own_team';

export function MyProfile() {
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

  const profile = useSelector(getGetPlayerSelector);
  const profilePending = useSelector(getGetPlayerPendingSelector);
  const user = useSelector(getLoginUserSelector);
  const userDetails = useSelector(getUserDetailsSelector);
  const dispatch = useDispatch();
  const DACAll = bindActionCreators(GetUserDataAC, dispatch);
  const DACPlayer = bindActionCreators(GetPlayerDatasAC, dispatch);
  const UpdatePlayerProfilePending = useSelector(
    UpdatePlayerProfilesPendingSelector
  );
  const coachData = useSelector(getCoachGetOwnTeamSelector);

  const UpdatePlayerProfileDataPending = useSelector(
    UpdatePlayerProfileDataPendingSelector
  );
  const GetPlayer = useSelector(GetPlayerProfilesSelector);

  useEffect(() => {
    DACPlayer.setGetPlayerDatas({
      players: {
        shoots: '',
        weight: '',
        height: '',
        birthdate: '',
        hometown: '',
        picture: '',
        jersey: '',
        position: '',
        is_active: false,
        required: '',
        user_team_id: 0,
        player_id: 0,
        team_id: 0,
      },
      access_token: user.access_token,
      token_type: user.token_type,
    });
  }, []);

  useEffect(() => {
    if (UpdatePlayerProfilePending === false) {
      DACAll.fetchUserRequest({
        username: '',
        first_name: '',
        access_token: user.access_token,
        token_type: user.token_type,
        last_name: '',
        role: '',
        user_id: '',
        role_type: '',
        email: '',
        role_id: 0,
        phone_number: '',
        profile_picture: '',
        image_url: '',
        user_team_id: '',
      });
    }
  }, [UpdatePlayerProfilePending]);

  useEffect(() => {
    if (UpdatePlayerProfileDataPending === false) {
      DACAll.fetchUserRequest({
        username: '',
        first_name: '',
        access_token: user.access_token,
        token_type: user.token_type,
        last_name: '',
        role: '',
        user_id: '',
        role_type: '',
        email: '',
        role_id: 0,
        phone_number: '',
        profile_picture: '',
        image_url: '',
        user_team_id: '',
      });
    }
  }, [UpdatePlayerProfileDataPending]);

  useEffect(() => {
    DACPlayer.setGetPlayerDatas({
      players: {
        shoots: '',
        weight: '',
        height: '',
        birthdate: '',
        hometown: '',
        picture: '',
        jersey: '',
        position: '',
        is_active: false,
        required: '',
        user_team_id: 0,
        player_id: 0,
        team_id: 0,
      },
      access_token: user.access_token,
      token_type: user.token_type,
    });
  }, [UpdatePlayerProfileDataPending]);

  const loading = <ActivityIndicator style={{ marginTop: '25%' }} />;

  const player = (
    <View style={styles(colors.profileContainerback).MainViewCoach}>
      {GetPlayer !== undefined &&
      userDetails?.user_id !== '' &&
      userDetails?.role_id !== 0 &&
      GetPlayer?.players.jersey !== '' ? (
        <>
          {userDetails.image_url ? (
            <View style={styles().profilePic}>
              <Image
                source={{ uri: userDetails.image_url }}
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
            <View
              style={{ right: 1, flexDirection: 'row', alignSelf: 'flex-end' }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigateTo('UpdatePlayerProfile');
                }}
              >
                <SimpleLineIcons
                  name="pencil"
                  size={16}
                  color={isDark ? '#ffff' : '#07243f'}
                />
              </TouchableOpacity>
            </View>

            {profilePending ? (
              <View>{loading}</View>
            ) : profile ? (
              <>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Text style={styles(colors.profileNames).nameText}>
                    {userDetails.first_name}
                  </Text>
                  <Text style={styles(colors.profileNames).nameText}>
                    {' '}
                    {userDetails.last_name}
                  </Text>
                </View>
                {GetPlayer.players.jersey === undefined ? (
                  <></>
                ) : (
                  <View>
                    {GetPlayer?.players.position.toUpperCase() ===
                      'RIGHTWING' ||
                    GetPlayer?.players.position.toUpperCase() === 'LEFTWING' ||
                    GetPlayer?.players.position.toUpperCase() === 'CENTER' ||
                    GetPlayer?.players.position.toUpperCase() === 'CENTRE' ||
                    GetPlayer?.players.position.toUpperCase() === 'STRING' ||
                    GetPlayer?.players.position.toUpperCase() === 'FORWARD' ? (
                      <Text style={styles(colors.editButton).jerseyNum}>
                        Position: Forward
                      </Text>
                    ) : GetPlayer?.players.position.toUpperCase() ===
                      'DEFENSE' ? (
                      <Text style={styles(colors.editButton).jerseyNum}>
                        Position: Defense
                      </Text>
                    ) : GetPlayer?.players.position.toUpperCase() ===
                      'GOALIE' ? (
                      <Text style={styles(colors.editButton).jerseyNum}>
                        Position: Goalie
                      </Text>
                    ) : null}

                    <Text style={styles(colors.editButton).jerseyNum}>
                      Jersey# : {GetPlayer.players.jersey}
                    </Text>
                    <Text style={styles(colors.playerInfo).teamName}>
                      Team Name: {coachData?.team_detail.team_name}
                    </Text>
                  </View>
                )}

                <Text style={styles(colors.playerInfo).phone}>
                  Phone Number: {userDetails?.phone_number}
                </Text>
                <Text style={styles(colors.playerInfo).email}>
                  Email: {userDetails.email}
                </Text>
                {coachData?.team_detail.birthdate === true && (
                  <Text style={styles(colors.playerInfo).email}>
                    Date of Birth:{' '}
                    {GetPlayer?.players?.birthdate?.length !== 0 ? (
                      <>
                        {moment(GetPlayer?.players?.birthdate).format(
                          'DD-MM-YYYY'
                        )}
                      </>
                    ) : (
                      <Text></Text>
                    )}
                  </Text>
                )}
                {coachData?.team_detail.hometown === true && (
                  <Text style={styles(colors.playerInfo).email}>
                    Home Town: {GetPlayer.players.hometown}
                  </Text>
                )}
                {coachData?.team_detail.shoots === true && (
                  <Text style={styles(colors.playerInfo).email}>
                    Shoots:{' '}
                    {GetPlayer.players.shoots === 'right' ? 'Right' : 'Left'}
                  </Text>
                )}
                {coachData?.team_detail.hometown === true && (
                  <Text style={styles(colors.playerInfo).email}>
                    Weight: {GetPlayer.players.weight} lbs
                  </Text>
                )}
                {coachData?.team_detail.hometown === true && (
                  <Text style={styles(colors.playerInfo).email}>
                    Height: {GetPlayer.players.height} ft
                  </Text>
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
  );

  const coach = (
    <View style={styles(colors.profileContainerback).MainViewCoach}>
      {userDetails.user_id !== '' && userDetails.role_id !== 0 ? (
        <>
          {userDetails.image_url ? (
            <View>
              <Image
                style={styles().profilePic}
                source={{
                  uri: userDetails.image_url,
                }}
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
            <View
              style={{ right: 1, flexDirection: 'row', alignSelf: 'flex-end' }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigateTo('UpdateCoachProfile');
                }}
              >
                <SimpleLineIcons
                  name="pencil"
                  size={16}
                  color={isDark ? '#ffff' : '#07243f'}
                />
              </TouchableOpacity>
            </View>
            {profilePending ? (
              <ActivityIndicator
                color={isDark ? '#ffff' : '#07243f'}
                style={{ marginTop: '12%' }}
              ></ActivityIndicator>
            ) : profile ? (
              <>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Text style={styles(colors.profileNames).nameText}>
                    {userDetails.first_name}{' '}
                  </Text>
                  <Text style={styles(colors.profileNames).nameText}>
                    {userDetails.last_name}
                  </Text>
                </View>
                <Text style={styles(colors.editButton).jerseyNum}>Coach</Text>
                <Text style={styles(colors.playerInfo).phone}>
                  Phone Number : {userDetails.phone_number}
                </Text>
                <Text style={styles(colors.playerInfo).email}>
                  Email : {userDetails.email}
                </Text>
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
  );

  return (
    <ScrollView style={styles(colors.background).container}>
      {userDetails.role_id !== 0 ? (
        <>
          {userDetails.role_id === 3 ? (
            <View>{player}</View>
          ) : (
            <View>{coach}</View>
          )}
        </>
      ) : (
        <View>{loading}</View>
      )}
    </ScrollView>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
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
      shadowRadius: 2.22,
      elevation: 3,
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
