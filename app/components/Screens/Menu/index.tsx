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
import { useTheme } from "../../../utils/themeContext";
import { SimpleLineIcons } from "@expo/vector-icons";
import Header from "../../Header";

export function Menu() {
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

  return (
    <ScrollView style={styles(colors.background).container}>
      <View style={styles().container}>
        <Header />
        {/* <Text style = {styles().heading}>My Profile</Text>       */}
        <View
          style={{
            backgroundColor: "#3483eb",
            display: "flex",
            height: 50,
            justifyContent: "center",
          }}
        >
          <Text style={styles().heading}>Menu</Text>
        </View>
        <View style={{ margin: 25 }}>
          <TouchableOpacity
            style={styles().mainView}
            onPress={()=>navigateTo('MyProfile')}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <Text style={styles(colors.playerInfo).phone}>
                  Profile
                </Text>
              </View>
            </View>
            <Image
              style={styles().image}
              source={require("../../../../assets/images/angle-right-1-32.png")}
            />
          </TouchableOpacity>
          <View style={styles().hr} />
          <TouchableOpacity
            style={styles().mainView}
            onPress = {()=>{navigateTo("Testimonials")}}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <Text style={styles(colors.playerInfo).phone}>
                  Testimonials
                </Text>
              </View>
            </View>
            <Image
              style={styles().image}
              source={require("../../../../assets/images/angle-right-1-32.png")}
            />
          </TouchableOpacity>
          <View style={styles().hr} />
          <TouchableOpacity
            style={styles().mainView}
            onPress = {() =>{navigateTo("ChangePassword")}}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <Text style={styles(colors.playerInfo).phone}>
                  Change Password
                </Text>
              </View>
            </View>
            <Image
              style={styles().image}
              source={require("../../../../assets/images/angle-right-1-32.png")}
            />
          </TouchableOpacity>
          <View style={styles().hr} />
          <TouchableOpacity
            style={styles().mainView}
            onPress = {()=>{navigateTo("AboutUs")}}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <Text style={styles(colors.playerInfo).phone}>
                  About US
                </Text>
              </View>
            </View>
            <Image
              style={styles().image}
              source={require("../../../../assets/images/angle-right-1-32.png")}
            />
          </TouchableOpacity>
          <View style={styles().hr} />
          <TouchableOpacity
            style={styles().mainView}
            onPress = {()=>{navigateTo("ApplicationInfo")}}

          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <Text style={styles(colors.playerInfo).phone}>
                  Application Info
                </Text>
              </View>
            </View>
            <Image
              style={styles().image}
              source={require("../../../../assets/images/angle-right-1-32.png")}
            />
          </TouchableOpacity>
          <View style={styles().hr} />
          <TouchableOpacity
            style={styles().mainView}
            onPress = {()=>{navigateTo("Main")}}

          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <Text style={styles(colors.playerInfo).phone}>
                  Sign Out
                </Text>
              </View>
            </View>
            <Image
              style={styles().image}
              source={require("../../../../assets/images/angle-right-1-32.png")}
            />
          </TouchableOpacity>
          <View style={styles().hr} />
        </View>
        
      </View>
    </ScrollView>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    heading: {
      textAlign: "center",
      color: "white",
      fontSize: 20,
      fontWeight: "700",
    },
    mainView:{ flexDirection: "row", justifyContent: "space-between" },
    container: {
      backgroundColor: "white",
    },
    hr: {
      borderBottomColor: "lightgray",
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: "5%",
    },
    image: {
      width: 25,
      height: 25,
      alignSelf:'center'
    },

    phone: { color: color, fontSize: 14, marginBottom: 15, marginTop:15 },
  });
