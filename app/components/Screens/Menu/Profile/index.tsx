import React, { useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "../../../../utils/themeContext";
import { SimpleLineIcons } from "@expo/vector-icons";
import Header from "../../../Header";
import { flush } from "redux-saga/effects";
import { useSelector } from "react-redux";
import { getUserDetailsSelector } from "../../../../store/detailInfo/selector";

export function MyProfile() {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const userDetails = useSelector(getUserDetailsSelector);

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
    <ScrollView style={styles(colors.background).container}>
      <View style={styles().container}>
        <Header isDrawer={false} />
        {/* <Text style = {styles().heading}>My Profile</Text>       */}
        <View style={styles(colors.profileContainerback).MainViewCoach}>
          <View style={styles(colors.redbackgroundSchedule).profilePic}>
            <Text style={styles(colors.dateTextSchedule).Avatar}>
              {userDetails.first_name[0].toUpperCase()}{' '}{userDetails.last_name[0].toUpperCase()}
            </Text>
          </View>
          <View>
            <View
              style={{ right: 1, flexDirection: "row", alignSelf: "flex-end" }}
            ></View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={styles(colors.profileNames).nameText}>
                {userDetails?.first_name}{" "}
              </Text>
              <Text style={styles(colors.profileNames).nameText}>
                {userDetails?.last_name}
              </Text>
            </View>
            <Text style={styles(colors.editButton).jerseyNum}>
              User Name : {userDetails.username}
            </Text>
            <Text style={styles(colors.playerInfo).phone}>
              CNIC Number : {userDetails.cnic}
            </Text>
            <Text style={styles(colors.playerInfo).email}>
              Email : {userDetails.email}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    heading: {
      fontSize: 25,
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      marginTop: "20%",
    },
    container: {
      backgroundColor: "white",
    },

    MainViewCoach: {
      width: "92%",
      position: "relative",
      marginTop: "20%",
      borderWidth: 0.01,
      borderColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 2.22,
      elevation: 3,
      padding: 15,
      display: "flex",
      marginLeft: 15,
      backgroundColor: color,
      shadowOpacity: 0.6,
      marginBottom: 25,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: color,
      opacity: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    profilePic: {
      width: 75,
      height: 75,
      borderRadius: 50,
      backgroundColor: color,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      zIndex: 3,
      opacity: 1,
      position: "absolute",
      top: -40,
      overflow: "hidden",
    },

    nameText: {
      fontSize: 22,
      fontWeight: "bold",
      color: color,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 35,
      alignItems: "center",
      alignSelf: "center",
    
    },
    Avatar: {
      fontSize: 22,
      fontWeight: "bold",
      color: color,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    
    },
    jerseyNum: {
      fontSize: 18,
      color: color,
      marginTop: 6,
      marginBottom: 10,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    teamName: {
      fontSize: 15,
      color: color,
      fontWeight: "500",
      marginBottom: 5,
    },
    phone: { color: color, fontSize: 14, marginBottom: 5 },
    email: { fontSize: 14, color: color, marginBottom: 10 },
    description: { fontSize: 14, color: color, marginBottom: 5 },
    button: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#07243F",
      width: 187,
      height: 38,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginTop: "25%",
    },
  });
