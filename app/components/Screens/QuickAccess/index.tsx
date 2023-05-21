import React, { useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../../../utils/themeContext";
import Header from "../../Header";


export function QuickAccess() {
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
      <Header />
      <View style={styles(colors.profileContainerback).MainViewCoach}>
        <View >
          <Text style= {styles().nameText}>Quick Access</Text>
          <Text style= {styles().email}>This App provides information about
           all the availabe services of citizens of punjab </Text>
          <View style={styles().hr}/>
        </View>
        <View style={{ flexDirection: "column", justifyContent: "center" , marginTop:15, marginBottom:15}}>

          <TouchableOpacity 
          style={{ flexDirection: "row", justifyContent:'space-between' }}
          onPress = {() =>{navigateTo("Service")}}
          >
            <View style={{ flexDirection: "row" , alignItems:'center'}}>
            <Image
              style={styles().image}
              source={require("../../../../assets/images/character-certificate.png")}
            />
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={styles(colors.playerInfo).phone}>
                Available Services
              </Text>
              <Text style={styles(colors.playerInfo).phone}>
                choose any service
              </Text>
            </View>
            </View>
            <Image
              style={styles().image}
              source={require("../../../../assets/images/angle-right-1-32.png")}
            />
            </TouchableOpacity>
            <TouchableOpacity 
            style={{ flexDirection: "row", justifyContent:'space-between' }}
            onPress={() =>{navigateTo("RegisterFIR")}}>
            <View style={{ flexDirection: "row" , alignItems:'center'}}>
            <Image
              style={styles().image}
              source={require("../../../../assets/images/character-certificate.png")}
            />
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={styles(colors.playerInfo).phone}>
                Register FBR
              </Text>
              <Text style={styles(colors.playerInfo).phone}>
                Register your complain here
              </Text>
            </View>
            </View>
            <Image
              style={styles().image}
              source={require("../../../../assets/images/angle-right-1-32.png")}
            />
            </TouchableOpacity>

            <TouchableOpacity 
            style={{ flexDirection: "row", justifyContent:'space-between' }}
            onPress={() =>{navigateTo('AllApplications')}}>
            <View style={{ flexDirection: "row" , alignItems:'center'}}>
            <Image
              style={styles().image}
              source={require("../../../../assets/images/character-certificate.png")}
            />
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={styles(colors.playerInfo).phone}>
                Track Application
              </Text>
              <Text style={styles(colors.playerInfo).phone}>
                Check Status of Application
              </Text>
            </View>
            </View>
            <Image
              style={styles().image}
              source={require("../../../../assets/images/angle-right-1-32.png")}
            />
            </TouchableOpacity>
          
          
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
      marginTop: "40%",
      borderWidth: 0.01,
      borderRadius:25,
      borderColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },

      shadowRadius: 12.22,
      elevation: 15,
      padding: 15,
      display: "flex",
      marginLeft: 15,
      backgroundColor: color,
      shadowOpacity: 0.,
      marginBottom: 25,
    },
    hr:{
      borderBottomColor: 'lightgray',
      borderBottomWidth: 3,
      marginTop:'3%'
      },
    image: {
      width: 25,
      height: 25,
      borderRadius: 50,
      zIndex: 3,
      margin: "5%",
      opacity: 1,
      overflow: "hidden",
    },
    
    nameText: {
      fontSize: 18,
      fontWeight: "bold",
      color: color,
      display: "flex",
      flexDirection: "row",
      marginLeft:10
    },
    
    phone: { color: color, fontSize: 14 },
    email: { marginLeft:10, fontSize: 14, color: color, marginBottom: 5 },
    
  });
