import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';
import colors from '../../Utils/colors';
import { getUserDetailsSelector } from '../../../../store/detailInfo/selector';
import { useSelector } from 'react-redux';
import { baseUrlAssets } from '../../../../shared/baseUrl';

export default function About() {
  const [data, setData] = useState(useSelector(getUserDetailsSelector));
  return (
    <ScrollView style={styles().containerAbout}>
      <View style={styles().section}>
        <View style={styles().profileView}>
          <View style={styles().profileViewInner}>
            <Image
              source={{
                uri: `${baseUrlAssets}assets/uploads/users/${data?.username}/profileImages/${data?.profile_image}`,
              }}
              style={styles().image}
            />
            <Text style={styles().name}>
              {data.fname} {data.lname}
            </Text>
          </View>
        </View>
        <Text style={styles().heading}>User Information</Text>
        <View style={styles().content}>
          <Text>
            Lorem ipsum!, dolor sit amet consectetur adipisicing elit. Eligendi,
            eum?
          </Text>

          <View style={styles().flexView}>
            <EvilIcons name="location" size={24} color="black" />
            <View style={styles().flexContent}>
              <Text style={styles().helpingText}>From</Text>
              <Text>Pakistan</Text>
            </View>
          </View>

          <View style={styles().flexView}>
            <AntDesign name="user" size={24} color="black" />
            <View style={styles().flexContent}>
              <Text style={styles().helpingText}>Member Sience</Text>
              <Text>Apr 2019</Text>
            </View>
          </View>

          <View style={styles().flexView}>
            <AntDesign name="eyeo" size={24} color="black" />
            <View style={styles().flexContent}>
              <Text style={styles().helpingText}>Last active</Text>
              <Text>13m ago</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles().section}>
        <Text style={styles().heading}>Languages</Text>
        <View style={styles().content}>
          <View style={styles().flexView}>
            <AntDesign name="user" size={24} color="black" />
            <View style={styles().flexContent}>
              <Text style={styles().helpingText}>English</Text>
              <Text>Fluent</Text>
            </View>
          </View>

          <View style={styles().flexView}>
            <AntDesign name="eyeo" size={24} color="black" />
            <View style={styles().flexContent}>
              <Text style={styles().helpingText}>Urdu</Text>
              <Text>Fluent</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles().section}>
        <Text style={styles().heading}>Skills</Text>
        <View style={styles().content}>
          <View style={styles().skills}>
            <Text style={styles().singleSkill}>React Js</Text>
            <Text style={styles().singleSkill}>Node Js</Text>
            <Text style={styles().singleSkill}>Bootstrap</Text>
            <Text style={styles().singleSkill}>Full Stack Development</Text>
            <Text style={styles().singleSkill}>WordPress</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = () =>
  StyleSheet.create({
    containerAbout: {
      flexDirection: 'column',
      flex: 1,
      paddingTop: 10,
      paddingBottom: 100,
      paddingHorizontal: 20,
    },
    section: {},
    heading: { fontSize: 20, fontWeight: '600', color: colors.primary },
    content: { marginTop: 20 },
    flexView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    flexContent: {
      marginLeft: 10,
    },
    helpingText: { color: '#949494' },
    skills: { flexDirection: 'row', width: '80%', flexWrap: 'wrap' },
    singleSkill: {
      backgroundColor: '#f0f0f0',
      marginHorizontal: 2,
      padding: 8,
      marginVertical: 3,
      borderRadius: 50,
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 50,
    },
    profileView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    profileViewInner: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontSize: 18,
    },
  });
