import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import { inviteAccpet } from '../store/AcceptInvitePlayer/actions';
import { bindActionCreators } from 'redux';
import { getData } from '../store/AcceptInvitePlayer/selector';
import base64 from 'react-native-base64';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationAccpet } from '../store/acceptNotification/actions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function ExpoNotification() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [invite, setInvite] = useState(false);
  const DAC = bindActionCreators(inviteAccpet, dispatch);
  const DACNotification = bindActionCreators(NotificationAccpet, dispatch);
  const data = useSelector(getData);
  const navigateTo = (screen: any) => {
    const dt = {
      name: screen,
      key: undefined,
      params: {},
      merge: undefined,
    } as any;
    navigation.navigate(dt);
  };
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  // React.useEffect(() => {
  //   const getBadge = async () => {
  //     const nu = await Notifications.getBadgeCountAsync();
  //   };
  //   getBadge();
  // }, []);

  React.useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      const data_type =
        lastNotificationResponse.notification.request.content.body;
      const game_type =
        lastNotificationResponse.notification.request.content.data?.game_type;

      const game_id =
        lastNotificationResponse.notification.request.content.data.game_id;

      // const chat_id = lastNotificationResponse.notification.request.content.dat

      DACNotification.Notification({
        notification_text: data_type,
      });

      const conversation_id =
        lastNotificationResponse.notification.request.content.data
          .conversation_id;
          
      if (data_type === 'A new announcement has been posted') {
        navigateTo('Home');
      } else if (
        data_type ===
        'A new Player has joined your team – head over to the team chat to welcome them'
      ) {
        navigateTo('Roster');
      } else if (data_type === 'A new event has been scheduled') {
        navigateTo('Schedule');
      } else if (data_type === 'A new message is received') {
        navigation.navigate('ChatBox', {
          id: conversation_id,
        });
      }
      else if( "healthreport_notification"){
        navigateTo('Health')
      }
    }
  }, [lastNotificationResponse]);

  useEffect(() => {
    const handler = (event) => {
      const urlObj = Linking.parse(event.url);
      const coach_id = urlObj.queryParams.coach_id;
      const player_id = urlObj.queryParams.player_id;
      if (
        player_id != null &&
        coach_id != null &&
        player_id != '' &&
        coach_id != ''
      ) {
        DAC.invite({
          player_id: base64.decode(player_id),
          coach_id: base64.decode(coach_id),
        });
        setInvite(true);
      }
    };

    const initial = async () => {
      const url = await Linking.getInitialURL();
      if (url !== null) {
        handler({ url });
      }
    };

    Linking.addEventListener('url', handler);
    initial();
  }, []);

  useEffect(() => {
    if (data.coach_id !== 0) {
      navigateTo('PlayerTerms');
    }
    setInvite(false);
  }, [invite]);
  return <></>;
}
