import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import colors from '../Utils/colors';

import { useNavigation } from '@react-navigation/native';
import ListItem from './ListItem';
import axios from 'axios';
import { baseUrl } from '../../../shared/baseUrl';
import { getLoginUserSelector } from '../../../store/loginUser/selector';
import { useSelector } from 'react-redux';
const InboxPage = () => {
  const [allCoversationList, setAllConversationList] = useState([]);
  const loginUser = useSelector(getLoginUserSelector);
  const messages = [
    {
      id: 1,
      title: 'alisher',
      image:
        'https://pps.whatsapp.net/v/t61.24694-24/291076649_581874260186733_6833089010006658180_n.jpg?ccb=11-4&oh=01_AVw0pNL06caK0_ItlO7CZ27PM7IaCcOHLMLy1qzUXC5ENg&oe=62F71372',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, commodi.',
      lastUpdated: 'April 25',
    },
    {
      id: 2,
      title: 'sameerakram',
      image:
        'https://pps.whatsapp.net/v/t61.24694-24/294675967_724796062116778_345485825601408355_n.jpg?ccb=11-4&oh=01_AVwMqXj5F9zZcLwQTvU-h386YUXfvI08pW_f9B9tnh-2qg&oe=62F9F9CD',
      description: 'So when you are pushing latest Code ?',
      lastUpdated: 'April 25',
    },
    {
      id: 3,
      title: 'aftabfalak',
      image:
        'https://pps.whatsapp.net/v/t61.24694-24/294353834_369078298633726_1250061463358787273_n.jpg?ccb=11-4&oh=01_AVxExXuJVFq7zZyIG67JUnhNLlmza9VUHlRD9YmvxECGGg&oe=62F9E844',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, commodi.',
      lastUpdated: 'April 25',
    },
  ];

  const getAlConversationListApi = async () => {
    const response = await axios.get(
      `${baseUrl}api/chatapp/get-chat-userData`,
      {
        headers: {
          'x-auth-token': loginUser?.token,
        },
      }
    );
    setAllConversationList(response.data.chatdata);
  };
  useEffect(() => {
    getAlConversationListApi();

    // if (userData.username !== '') {
    //   axios
    //     .get('/api/chatapp/get-messages/' + userData.username)
    //     .then((res) => {
    //       setchatData(res.data.chatdata.messages);
    //     })
    //     .catch((error) => {});
    // }
  }, []);

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
  return (
    <View style={styles.container}>
      <FlatList
        data={allCoversationList}
        renderItem={({ item }) => <ListItem item={item} />}
        style={{ paddingHorizontal: 15 }}
        keyExtractor={(item) => item.image.toString()}
      />
    </View>
  );
};
export default InboxPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
