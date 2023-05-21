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
import { displayHeight, displayWidth } from "../../../../utils/commonFunctions";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../../utils/themeContext";
import CustomSnackBar from "../../../SnackBar";
import Header from "../../../Header";
import { getLoginUserSelector } from "../../../../store/loginUser/selector";
import { bindActionCreators } from "redux";
import { GetFIRByCNICAC } from "../../../../store/getFIRbyCNIC/actions";
import {
  getFIRByCNICErrorSelector,
  getFIRByCNICPendingSelector,
  getFIRByCNICSelector,
} from "../../../../store/getFIRbyCNIC/selector";
import { getUserDetailsSelector } from "../../../../store/detailInfo/selector";
import Spinner from "../../../Spinner/Spinner";
import { AllFIRReduxSaga } from "../../../../store/getAllFIR/saga";

export function TrackApplication() {
  const navigation = useNavigation();
  const [title, settitle] = useState("");
  const [fircnic, setFirCnic] = useState([]);

  const dispatch = useDispatch();

  const { colors, isDark } = useTheme();

  const [visible, setVisible] = React.useState(false);
  const [message, setMesssage] = React.useState("");
  const loginUser = useSelector(getLoginUserSelector);
  const userDetails = useSelector(getUserDetailsSelector);
  const DAC = bindActionCreators(GetFIRByCNICAC, dispatch);
  // useEffect(() =>{

  // },[])
  const FIR_by_cnic = useSelector(getFIRByCNICSelector);
  const AllFIRPending = useSelector(getFIRByCNICPendingSelector);
  const AllFIRError = useSelector(getFIRByCNICErrorSelector);
  const submitHit = useRef(false);

  const handleSubmit = () => {
    if (title.length === 0) {
      setVisible(true);
      setMesssage("Enter Your CNIC");
    } else {
      DAC.setGetFIRByCNIC({ user_cnic: Number(title), token: loginUser.token });
    }
  };

  useEffect(() => {
    if (AllFIRPending === true) return;
    if (submitHit.current === true) {
      if (FIR_by_cnic.length !== 0) {
        setVisible(true);
        setMesssage("Failed to Login Please Check Username and Password");
        return;
      } else if (loginUser.token !== "") {
        setFirCnic(FIR_by_cnic);
      }
      submitHit.current = false;
    }
  }, [AllFIRPending]);

  return (
    <View style={styles(colors.background).container}>
      <Header isDrawer={false} />
      <Text style={styles(colors.heading).coachText}>Track Application</Text>
      <KeyboardAwareScrollView>
        <View>
          <View style={{ padding: 15 }}>
            <View>
              <Text style={styles(colors.heading).fieldText}>Enter CNIC:</Text>
              <TextInput
                style={
                  styles(colors.loginLandingBack, colors.loginInputTextColor)
                    .title
                }
                onChangeText={settitle}
                value={title}
                placeholder="0000000000000"
                keyboardType="numeric"
                maxLength={13}
              />
            </View>
          </View>
        </View>
        <View style={styles().buttonsView}>
          <TouchableOpacity style={styles().button} onPress={handleSubmit}>
            <Text style={styles().btnText}>Track </Text>
          </TouchableOpacity>
        </View>
        {AllFIRPending ? (
          <Spinner />
        ) : (
          <View style={{ margin: 25 }}>
            {FIR_by_cnic?.map((item, ind) => {
              return (
                <View key={ind}>
                  <TouchableOpacity
                    style={styles().mainView}
                    onPress={() =>
                      navigation.navigate("ApplicationDetails", {
                        id: item.id,
                      })
                    }
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={styles(colors.playerInfo).phone}>
                          {item.title}
                        </Text>
                      </View>
                    </View>
                    <Image
                      style={styles().image}
                      source={require("../../../../../assets/images/angle-right-1-32.png")}
                    />
                  </TouchableOpacity>
                  <View style={styles().hr} />
                </View>
              );
            })}
          </View>
        )}
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
    mainView: { flexDirection: "row", justifyContent: "space-between" },
    hr: {
      borderBottomColor: "lightgray",
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginTop: "5%",
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
    image: {
      width: 25,
      height: 25,
      alignSelf: "center",
    },
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
