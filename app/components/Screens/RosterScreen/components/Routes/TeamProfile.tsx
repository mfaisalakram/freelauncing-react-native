import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getLoginUserSelector } from '../../../../../store/loginUser/selector';
import { bindActionCreators } from 'redux';
import { GetCoachTeamAC } from '../../../../../store/getCoachTeam/actions';
import {
  getCoachTeamSelector,
  getCoachTeamPendingSelector,
  TeamDetailSelector,
} from '../../../../../store/getCoachTeam/selector';
import {
  getremovePlayerErrorSelector,
  getremovePlayerPendingSelector,
  getremovePlayerSelector,
} from '../../../../../store/removePlayer/selector';
import { useDispatch, useSelector } from 'react-redux';
import { NewRemovePlayerAC } from '../../../../../store/removePlayer/actionCreator';
import { getUserDetailsSelector } from '../../../../../store/detailInfo/selector';

import { useTheme } from '../../../../../utils/themeContext';
import CustomSnackBar from '../../../../SnackBar';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { UpdatePlayerProfileDataPendingSelector } from '../../../../../store/updatePlayerData/selector';
import { getNotification } from '../../../../../store/acceptNotification/selector';
import {
  CoachGetOwnTeamAC,
  getCoachGetOwnTeamSelector,
} from '../../../../../store/getCoachTeam/coach_get_own_team';
import Header from '../../../../Header';
export function TeamProfile() {
  const Notification = useSelector(getNotification);
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
  const [playerId, setPlayerID] = useState(0);
  const userDetails = useSelector(getUserDetailsSelector);

  const user = useSelector(getLoginUserSelector);
  const dispatch = useDispatch();
  const DAC = bindActionCreators(CoachGetOwnTeamAC, dispatch);
  const DACAll = bindActionCreators(NewRemovePlayerAC, dispatch);
  // const coachData?.team_player = useSelector(getCoachTeamSelector);
  const coachTeamPending = useSelector(getCoachTeamPendingSelector);
  const coachData = useSelector(getCoachGetOwnTeamSelector);

  const submitHit = useRef(false);
  const [toLogin, setToLogin] = useState(false);
  const removePlayersUserError = useSelector(getremovePlayerErrorSelector);
  const removePlayersUser = useSelector(getremovePlayerSelector);
  const removePlayersPending = useSelector(getremovePlayerPendingSelector);
  const UpdatePlayerProfileDataPending = useSelector(
    UpdatePlayerProfileDataPendingSelector
  );
  const [visible, setVisible] = React.useState(false);
  const [message, setMesssage] = React.useState('');

  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    DAC.coachOwnTeam(user.access_token, user.token_type);
  }, []);

  useEffect(() => {
    DAC.coachOwnTeam(user.access_token, user.token_type);
  }, [UpdatePlayerProfileDataPending, Notification]);

  const handleSubmit = () => {
    submitHit.current = true;

    DACAll.setNewRemovePlayer({
      player: {
        shoots: '',
        weight: '',
        height: '',
        birthdate: '',
        hometown: '',
        picture: ' ',
        jersey: '',
        position: '',
        is_active: true,
        required: '',
      },
      access_token: user.access_token,
      token_type: user.token_type,
      player_id: playerId,
    });
  };

  useEffect(() => {
    if (removePlayersPending === true) return;
    if (submitHit.current === true) {
      if (removePlayersUserError !== '') {
        setVisible(true);
        setMesssage("Sorry! Can't Remove player");
      } else if (removePlayersUser.player_id === playerId) {
        setVisible(true);
        setMesssage('Successfully removed player from Team');
        DAC.coachOwnTeam(user.access_token, user.token_type);
      } else {
        setToLogin(true);
      }
    }
    submitHit.current = false;
  }, [submitHit, DAC]);

  const forwardTeam = coachData?.team_player?.filter((dt) => {
    return (
      dt.position.toUpperCase() !== 'GOALIE' &&
      dt.position.toUpperCase() !== 'DEFENSE' &&
      dt.position.toUpperCase() !== 'DEFENCE'
    );
  });

  const Forward = (
    <>
      <Text style={styles(colors.playerText).playerText}>Forward</Text>
      {forwardTeam?.length !== 0 ? (
        forwardTeam?.map((data, ind) => (
          <TouchableOpacity
            onPress={() => {
              if (data.player_id === playerId) {
                setPlayerID(0);
              } else {
                setPlayerID(data.player_id);
              }
            }}
            onLongPress={() => {
              navigation.navigate('PlayerProfile', { id: data.player_id });
            }}
            key={ind}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}
          >
            <View style={styles().View}>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  {data.images_url !== '' ? (
                    <Image
                      source={{ uri: data.images_url }}
                      style={styles().mainView}
                    />
                  ) : (
                    <Image
                      source={require('@app/assets/images/user.png')}
                      style={styles().mainView}
                    />
                  )}
                </View>
                <View style={styles().playerData}>
                  <Text style={styles(colors.playerNameText).playerName}>
                    {data.first_name}{' '}
                  </Text>
                  <Text style={styles(colors.playerNameText).playerName}>
                    {data.last_name}
                  </Text>
                </View>
              </View>
              <View style={styles().jersey}>
                {!data.jersey || data.jersey === 'string' ? (
                  <></>
                ) : (
                  <Text style={styles(colors.jerseyText).jerseyText}>
                    #{data.jersey.slice(0, 2)}
                  </Text>
                )}
              </View>
            </View>
            {userDetails.role_id === 3 ? (
              <></>
            ) : (
              <>
                {data.player_id === playerId ? (
                  <View
                    style={{
                      justifyContent: 'center',
                    }}
                  >
                    <AntDesign
                      name="checkcircle"
                      size={16}
                      color={isDark ? '#ffff' : '#07243f'}
                    />
                  </View>
                ) : (
                  <></>
                )}
              </>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles(colors.heading).noPlayerText}>
          No Forward Player
        </Text>
      )}
    </>
  );

  const defenceTeam = coachData?.team_player?.filter((dt) => {
    return (
      dt.position.toUpperCase() === 'DEFENSE' ||
      dt.position.toUpperCase() === 'DEFENCE'
    );
  });

  const Defense = (
    <>
      <Text style={styles(colors.playerText).playerText}>Defense</Text>
      {defenceTeam?.length !== 0 ? (
        defenceTeam?.map((data, ind) => (
          <TouchableOpacity
            onPress={() => {
              if (data.player_id === playerId) {
                setPlayerID(0);
              } else {
                setPlayerID(data.player_id);
              }
            }}
            onLongPress={() => {
              navigation.navigate('PlayerProfile', { id: data.player_id });
            }}
            key={ind}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}
          >
            <View style={styles().View}>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  {data.images_url !== '' ? (
                    <Image
                      source={{ uri: data.images_url }}
                      style={styles().mainView}
                    />
                  ) : (
                    <Image
                      source={require('@app/assets/images/user.png')}
                      style={styles().mainView}
                    />
                  )}
                </View>
                <View style={styles().playerData}>
                  <Text style={styles(colors.playerNameText).playerName}>
                    {data.first_name}
                  </Text>
                  <Text style={styles(colors.playerNameText).playerName}>
                    {' '}
                    {data.last_name}
                  </Text>
                </View>
              </View>
              <View style={styles().jersey}>
                {!data.jersey || data.jersey === 'string' ? (
                  <></>
                ) : (
                  <Text style={styles(colors.jerseyText).jerseyText}>
                    #{data.jersey.slice(0, 2)}
                  </Text>
                )}
              </View>
            </View>
            {userDetails.role_id === 3 ? (
              <></>
            ) : (
              <>
                {data.player_id === playerId ? (
                  <View
                    style={{
                      justifyContent: 'center',
                    }}
                  >
                    <AntDesign
                      name="checkcircle"
                      size={16}
                      color={isDark ? '#ffff' : '#07243f'}
                    />
                  </View>
                ) : (
                  <></>
                )}
              </>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles(colors.heading).noPlayerText}>
          No Defense Player
        </Text>
      )}
    </>
  );

  const goalieTeam = coachData?.team_player?.filter((dt) => {
    return dt.position.toUpperCase() === 'GOALIE';
  });

  const Goalie = (
    <>
      <Text style={styles(colors.playerText).playerText}>Goalie</Text>
      {goalieTeam?.length !== 0 ? (
        goalieTeam?.map((data, ind) => (
          <TouchableOpacity
            onPress={() => {
              if (data.player_id === playerId) {
                setPlayerID(0);
              } else {
                setPlayerID(data.player_id);
              }
            }}
            onLongPress={() => {
              navigation.navigate('PlayerProfile', { id: data.player_id });
            }}
            key={ind}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}
          >
            <View style={styles().View}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View>
                  {data.images_url !== '' ? (
                    <Image
                      source={{ uri: data.images_url }}
                      style={styles().mainView}
                    />
                  ) : (
                    <Image
                      source={require('@app/assets/images/user.png')}
                      style={styles().mainView}
                    />
                  )}
                </View>
                <View style={styles().playerData}>
                  <Text style={styles(colors.playerNameText).playerName}>
                    {data.first_name}{' '}
                  </Text>
                  <Text style={styles(colors.playerNameText).playerName}>
                    {' '}
                    {data.last_name}
                  </Text>
                </View>
              </View>
              <View style={styles().jersey}>
                {!data.jersey || data.jersey === 'string' ? (
                  <></>
                ) : (
                  <Text style={styles(colors.jerseyText).jerseyText}>
                    #{data.jersey.slice(0, 2)}
                  </Text>
                )}
              </View>
            </View>
            {userDetails.role_id === 3 ? null : (
              <>
                {data.player_id === playerId ? (
                  <View
                    style={{
                      justifyContent: 'center',
                    }}
                  >
                    <AntDesign
                      name="checkcircle"
                      size={16}
                      color={isDark ? '#ffff' : '#07243f'}
                    />
                  </View>
                ) : (
                  <></>
                )}
              </>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles(colors.heading).noPlayerText}>
          No Goalie Player
        </Text>
      )}
    </>
  );

  return (
    <View style={styles(colors.background).container}>
      <Header isDrawer={false} />
      <Text style={styles(colors.heading, colors.background).coachText}>
        Team Profile
      </Text>
      {coachTeamPending ? (
        <ActivityIndicator
          color={isDark ? '#ffff' : '#07243f'}
          style={{ marginTop: '40%' }}
        />
      ) : (
        <>
          <ScrollView overScrollMode="never">
            <View style={{ padding: 15 }}>
              <>{Forward}</>
              <View style={{ marginVertical: 20 }}></View>
              <>{Defense}</>
              <View style={{ marginVertical: 20 }}></View>
              <>{Goalie}</>
            </View>
          </ScrollView>
        </>
      )}

      <View>
        <CustomSnackBar
          message={message}
          visible={visible}
          setVisible={setVisible}
        />
      </View>
    </View>
  );
}

const styles = (color?: string, bac?: string) =>
  StyleSheet.create({
    noPlayerText: {
      color: color,
      textAlign: 'center',
      fontSize: 12,
    },
    container: {
      backgroundColor: color,
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      flex: 1,
      padding: 12,
    },
    View: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '92%',
    },
    mainView: {
      width: 48,
      height: 48,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    playerData: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 15,
    },
    playerName: {
      fontWeight: 'bold',
      color: color,
    },
    playerText: {
      alignContent: 'flex-start',
      fontSize: 18,
      color: color,
      fontWeight: 'bold',
    },
    icon: {
      alignItems: 'center',
      color: 'black',
      fontSize: 24,
      paddingTop: 7,
    },
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    button: {
      flexDirection: 'row',
      backgroundColor: '#07243F',
      width: 140,
      height: 38,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
    jersey: {
      width: '35%',
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      color: color,
    },
    jerseyText: {
      color: color,
    },
    text: {
      paddingBottom: 25,
    },
    coachText: {
      textAlign: 'center',
      fontSize: 18,
      color: color,
      fontWeight: 'bold',
      backgroundColor: bac,
    },
    image: { width: 60, height: 46 },
    userName: {
      height: 42,
      width: '97%',
      backgroundColor: '#F0F0F0',
      paddingLeft: 10,
      borderRadius: 6,
      marginLeft: 5,
      fontSize: 12,
    },
    centered_view2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000099',
    },
    innerView2: {
      backgroundColor: color,
      width: 350,
      height: 200,
      borderRadius: 12,
      elevation: 5,
      justifyContent: 'center',
    },
    deleteInnerView2: {
      backgroundColor: color,
      width: 300,
      minHeight: 150,
      borderRadius: 12,
      elevation: 5,
      justifyContent: 'center',
    },
    deletePopupTitleText: {
      fontSize: 14,
      marginBottom: 10,
      textAlign: 'center',
      color: color,
    },
    buttonPopup: {
      backgroundColor: '#07243F',
      width: 100,
      height: 38,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    warningTitle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
