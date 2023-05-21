import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import colors from '../Screens/Utils/colors';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { baseUrlAssetsGigs } from '../../shared/baseUrl';

const SingerBuyerGig = ({
  img,
  username,
  profileImage,
  title,
  raiting,
  price,
  usernameClick,
  titleClick,
}) => {
  const navigation = useNavigation();
  const navigateTo = (screen: any) => {
    const dt = {
      name: screen,
      key: undefined,
      params: {
        clickedTitle: titleClick,
        clickedUserName: usernameClick,
        refresh: 'refresh',
      },
      merge: undefined,
    } as any;
    navigation.navigate(dt);
  };

  return (
    <Card
      style={styles().container}
      onPress={() => {
        navigateTo('GigDetail');
      }}
    >
      <Card.Cover
        source={{ uri: `${baseUrlAssetsGigs}${img}` }}
        style={styles().image}
      />
      <Card.Content style={styles().content}>
        <Title style={styles().raiting}>{raiting}</Title>
        <View style={{ flexDirection: 'row', padding: 0, margin: 0 }}>
          <Card.Cover
            source={{ uri: `${baseUrlAssetsGigs}${profileImage}` }}
            style={styles().profileimage}
          />
          <Text>{username}</Text>
        </View>
        <Title style={styles().title}>{title}</Title>
        <Paragraph style={styles().price}>
          {price ? `$starting at ${price}` : '$10'}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = (mode?: any) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      width: 150,
      marginVertical: 10,
      marginHorizontal: 10,
      borderRadius: 10,
    },
    image: {
      resizeMode: 'cover',
      height: 100,
      width: '100%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    profileimage: {
      resizeMode: 'cover',
      height: 30,
      width: 30,
      borderRadius: 50,
      marginRight: 10,
    },
    raiting: { color: 'gray', fontSize: 12 },
    title: { fontSize: 12, lineHeight: 14 },
    content: {
      padding: 0,
      margin: 0,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    price: { fontWeight: 'bold' },
  });

export default SingerBuyerGig;
