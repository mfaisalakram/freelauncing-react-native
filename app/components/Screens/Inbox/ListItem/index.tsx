import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../../Utils/colors';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { baseUrlAssets, baseUrlAssetsGigs } from '../../../../shared/baseUrl';

import imgPlaceholder from '../../../../../assets/images/user.png';

import { getUserDetailsSelector } from '../../../../store/detailInfo/selector';
import { useSelector } from 'react-redux';
import moment from 'moment';

const ListItem = ({ item }) => {
  const [userName, serUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [sender, setSender] = useState('');

  const navigation = useNavigation();
  const navigateTo = (screen: any) => {
    const dt = {
      name: screen,
      key: undefined,
      params: { userName: userName, userImage: userImage, sender: sender },
      merge: undefined,
    } as any;
    navigation.navigate(dt);
  };
  const userData = useSelector(getUserDetailsSelector);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        serUserName(item?.receiverUsername);
        setUserImage(item?.image);
        setSender(item?.messages?.sender);
        navigateTo('ChatBox');
      }}
    >
      <Image
        source={{
          uri:
            item.image === undefined
              ? imgPlaceholder
              : `${baseUrlAssets}assets/uploads/users/${item.receiverUsername}/profileImages/${item.image}`,
        }}
        style={styles.image}
      />

      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.title}>{item?.receiverUsername}</Text>
          <Text style={styles.sameColor}>
            {moment(item?.messages?.time).format('MMM Do YYYY')}
          </Text>
        </View>
        <>
          {item?.messages?.type === 'plain' ? (
            <Text style={styles.lastText} numberOfLines={4}>
              <Text style={styles.you}>
                {item?.messages?.sender !== userData.username ? '' : 'You: '}
              </Text>
              {item?.messages?.text}
            </Text>
          ) : (
            <Text style={styles.lastText}>
              <FontAwesome name="photo" size={16} color="gray" /> Photo
            </Text>
          )}
        </>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  title: {
    fontSize: 15,
  },
  sameColor: {
    color: '#888888',
  },
  lastText: {
    color: '#888888',
  },
  you: {
    color: '#888888',
    fontWeight: 'bold',
  },
});

export default ListItem;
