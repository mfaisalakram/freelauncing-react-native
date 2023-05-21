import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { displayHeight, displayWidth } from "../../../utils/commonFunctions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../utils/themeContext";
import CustomSnackBar from "../../SnackBar";
import Header from "../../Header";
import {bindActionCreators} from 'redux'
import { FIRDetailsAC } from "../../../store/getFIRDetails/actions";
import { getLoginUserSelector } from "../../../store/loginUser/selector";
import { getFIRDetailSelector } from "../../../store/getFIRDetails/selector";
import moment from "moment";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { getUserDetailsErrorSelector, getUserDetailsSelector } from "../../../store/detailInfo/selector";

export function ApplicationDetails() {
  const navigation = useNavigation();
  const route = useRoute()
  const dispatch = useDispatch();
 console.log(route.params?.id);
 const id = route.params?.id
 
  const { colors, isDark } = useTheme();

  const [visible, setVisible] = React.useState(false);
  const [message, setMesssage] = React.useState("");

  const DAC = bindActionCreators(FIRDetailsAC, dispatch)
  const loginUser = useSelector(getLoginUserSelector);
  const FIRDetails = useSelector(getFIRDetailSelector);
const userDetail= useSelector(getUserDetailsSelector)
  async function CheckCNIC(berer_token:string) {
    const data = {
      is_seen: true
    }
    const body = JSON.stringify(data)
    try {
      const response = await axios.patch(
        baseUrl+"is_seen_update/"+id,body,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: berer_token,
          },
        }
      );
      console.log('Expo Token in Login Page', response.data);
      if (response.data){
        console.log
        (true)
      }
      return response.data;
    } catch (err: any) {
      console.log('error in expoPushToken');
    }
  }

  useEffect(()=>{
    if(id){
      DAC.setFIRDetails({user_id:id , token:loginUser.token})
      CheckCNIC('token'+' '+loginUser.token)
    }
  },[])

console.log('FIRDetails', FIRDetails);



  return (
    <View style={styles(colors.background).container}>
<Header isDrawer={false}/>
<Text style={styles(colors.heading).coachText}>Application Details</Text>
      <KeyboardAwareScrollView>

              <View style={styles(colors.profileContainerback).MainViewCoach}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style= {styles().nameText}>Created By:</Text>
                <Text style= {styles().phone}>{FIRDetails?.created_by} </Text>
              </View >
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style= {styles().nameText}>Cnic of {FIRDetails?.created_by}:</Text>
                <Text style= {styles().phone}>{FIRDetails?.cnic_number} </Text>
              </View >
              {userDetail.superuser?
              <></>:
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style= {styles().nameText}>Status:</Text>
                {FIRDetails?.is_seen===true?
                <Text style= {styles().phone}>Seen by Station </Text>
                :<Text style= {styles().phone}>Pending </Text>}
              </View >}
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style= {styles().nameText}>Catagory:</Text>
                <Text style= {styles().phone}>{FIRDetails?.catagory} </Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style= {styles().nameText}>District:</Text>
                <Text style= {styles().phone}>{FIRDetails?.district}</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style= {styles().nameText}>Police Station Name:</Text>
                <Text style= {styles().phone}>{FIRDetails?.police_station}</Text>
              </View>
              <View >
                <Text style= {styles().nameText}>Date and Time:</Text>
                <Text style= {styles().phone}>{moment(FIRDetails?.datetime).format("MMMM Do, YYYY")}</Text>
              </View>
              <View >
                <Text style= {styles().nameText}>Location:</Text>
                <Text style= {styles().phone}>{FIRDetails?.location} </Text>
              </View>
              
              <View >
                <Text style= {styles().nameText}>Title:</Text>
                <Text style= {styles().phone}>{FIRDetails?.title} </Text>
              </View>
              <View >
                <Text style= {styles().nameText}>Description:</Text>
                <Text style= {styles().phone}>{FIRDetails?.description}</Text>
              </View>
            </View>
      </KeyboardAwareScrollView>
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

const styles = (color?: string, textColor?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
      flexDirection: "column",
      width: displayWidth,
      height: displayHeight,
      flex: 1,
    },
    nameText: {
      fontSize: 18,
      fontWeight: "bold",
      color: color,
      marginTop:5,
      display: "flex",
      flexDirection: "row",
      marginLeft:10
      
    },
    MainViewCoach: {
    //   width: "92%",
      position: "relative",
      marginTop: "5%",
      borderWidth: 0.01,
      borderColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },

      shadowRadius: 12.22,
      elevation: 15,
    //   padding: 15,
      display: "flex",
      backgroundColor: color,
      shadowOpacity: 0.,
      marginBottom: 25,
    },
    phone: { color: color, fontSize: 14, marginLeft:10, marginTop:15,marginBottom:10},

    buttonsView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: "3%",
    },
    coachView: {
      width: "40%",
      justifyContent: "center",
      marginTop: 50,
      paddingLeft: 10,
    },
    coachText: {
      textAlign: "center",
      fontSize: 18,
      color: color,
      fontWeight: "bold",
      marginTop: 5,
      marginBottom: 10,
    },
    icon: {
      alignItems: "center",
      color: "black",
      fontSize: 24,
      paddingTop: 7,
    },
    button: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#07243F",
      width: "30%",
      height: 38,
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
    },
    loginButton: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#F0F0F0",
      width: 280,
      height: 38,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    forgetText: {
      textAlign: "center",
      color: "#07243F",
      paddingTop: 15,
      textDecorationLine: "underline",
    },
    btnText: {
      color: "#fff",
    },
    loginTxt: {
      color: "#000",
    },
    text: {
      paddingBottom: 25,
    },
    imageView: {
      alignItems: "center",
      marginTop: "10%",
      justifyContent: "center",
      resizeMode: "contain",
    },
    image: { width: 60, height: 46 },
    fieldText: { padding: 8, color: color },
    textName: {
      height: 42,
      width: "47%",
      backgroundColor: color,
      paddingLeft: 10,
      borderRadius: 6,
      fontSize: 12,
      // fontWeight: 'bold',
      color: textColor,
    },
    title: {
      color: textColor,
      height: 42,
      width: "97%",
      backgroundColor: color,
      paddingLeft: 10,
      borderRadius: 6,
      marginLeft: 5,
      fontSize: 12,
    },
  });
