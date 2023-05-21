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
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../utils/themeContext";
import CustomSnackBar from "../../SnackBar";
import Header from "../../Header";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";
import { getLoginUserSelector } from "../../../store/loginUser/selector";

export function ChangePassword() {
  const navigation = useNavigation();
  const [oldpassword, setOldPassword] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState<string>();
  const [check, setCheck] = useState<Boolean>();

  const dispatch = useDispatch();

  const { colors, isDark } = useTheme();

  const [visible, setVisible] = React.useState(false);
  const [message, setMesssage] = React.useState("");

  async function ChangePassword(berer_token: string) {
    try {
      const data = {
        old_password: oldpassword,
        new_password: password
      };
      const body = JSON.stringify(data);
      const response = await axios.patch(baseUrl + "update_password", body, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: berer_token,
        },
      });
      console.log("Expo Token in Login Page", response.data);
      if (response.data) {
        setTimeout(() => {
        setCheck(true);
        }, 5000);
        setVisible(true);
        setMesssage("Password has been Changed");
        
      }
      return response.data;
    } catch (err: any) {
      setVisible(true);
      setMesssage("Error while Changing passsword");
      console.log("error in expoPushToken", err);
    }
  }
  const loginUser = useSelector(getLoginUserSelector);

  let reg2 = /^(?=.*[A-Z]).{8,}$/; // password
  const handleSubmit = () => {
    if (password.length <= 0) {
      setVisible(true);
      setMesssage("Password is Required");
      return;
    } else if (password.length < 8) {
      setVisible(true);
      setMesssage("Password must be at least 8 charaters");
    } else if (reg2.test(password) === false) {
      setVisible(true);
      setMesssage("Password must have at least one capital letter");
    } else if (password !== password2) {
      setVisible(true);
      setMesssage("Password doesn't match");
      return;
    } else {
      ChangePassword("token" + " " + loginUser.token);
    }
  };

  useEffect(()=>{
    if(check){
      navigation.goBack()
    }
  },[check])

  return (
    <View style={styles(colors.background).container}>
      <Header isDrawer={false} />
      <Text style={styles(colors.heading).coachText}>Change Password</Text>
      <KeyboardAwareScrollView>
        <View>
          <View style={{ padding: 15 }}>
            <View>
              <Text style={styles(colors.heading).fieldText}>
                Old Password:
              </Text>
              <TextInput
                style={
                  styles(colors.loginLandingBack, colors.loginInputTextColor)
                    .password
                }
                onChangeText={setOldPassword}
                value={oldpassword}
                placeholder="Old Password"
                keyboardType="default"
              />
            </View>
            <View>
              <Text style={styles(colors.heading).fieldText}>
                New Password:
              </Text>
              <TextInput
                style={
                  styles(colors.loginLandingBack, colors.loginInputTextColor)
                    .password
                }
                onChangeText={setpassword}
                value={password}
                placeholder="New Password"
                keyboardType="default"
              />
            </View>
            <View>
              <Text style={styles(colors.heading).fieldText}>
                Confirm New Password:
              </Text>
              <TextInput
                style={
                  styles(colors.loginLandingBack, colors.loginInputTextColor)
                    .password
                }
                onChangeText={setpassword2}
                value={password2}
                placeholder="Confirm New Password"
                keyboardType="default"
              />
            </View>
          </View>
        </View>
        <View style={styles().buttonsView}>
          <TouchableOpacity style={styles().button} onPress={handleSubmit}>
            <Text style={styles().btnText}>Change Password </Text>
          </TouchableOpacity>
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
      display: "flex",
      flexDirection: "row",
      marginLeft: 10,
    },
    MainViewCoach: {
      width: "92%",
      position: "relative",
      marginTop: "5%",
      borderWidth: 0.01,
      borderRadius: 25,
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
      shadowOpacity: 0,
      marginBottom: 25,
    },
    phone: { color: color, fontSize: 14, marginLeft: 10 },

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
      width: "50%",
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
    password: {
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
