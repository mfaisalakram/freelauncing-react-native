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
import DropDownPicker from "react-native-dropdown-picker";
import Header from "../../../Header";
import { bindActionCreators } from "redux";
import { RegisterFIRAC } from "../../../../store/registerFIR/actionCreator";
import { getLoginUserSelector } from "../../../../store/loginUser/selector";
import {
  getRegisterFIRErrorSelector,
  getRegisterFIRPendingSelector,
  getRegisterFIRSelector,
} from "../../../../store/registerFIR/selector";
import { getUserDetailsSelector } from "../../../../store/detailInfo/selector";

export function RegisterFIR() {
  const navigation = useNavigation();
  const submitHit = useRef(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Stealing");
  const [items, setItems] = useState([
    { label: "Rape", value: "Rape" },
    { label: "Stealing", value: "Stealing" },
    { label: "Murder", value: "Murder" },
  ]);

  const [stationOpen, setStationOpen] = useState(false);
  const [stationValue, setStationValue] = useState("Gulberg");
  const [stationItem, setStationItem] = useState([
    { label: "RA Bazar", value: "RA Bazar" },
    { label: "Gulberg", value: "Gulberg" },
    { label: "DHA3", value: "DHA3" },
  ]);
  const { colors, isDark } = useTheme();

  const [visible, setVisible] = React.useState(false);
  const [message, setMesssage] = React.useState("");
  const DAC = bindActionCreators(RegisterFIRAC, dispatch);
  const loginUser = useSelector(getLoginUserSelector);
  const RegisterFIRPending = useSelector(getRegisterFIRPendingSelector);
  const RegisterFIR = useSelector(getRegisterFIRSelector);
  const RegisterFIRError = useSelector(getRegisterFIRErrorSelector);
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
  const handleSubmit = () => {
    if (value === "") {
      setVisible(true);
      setMesssage("Catagory is Required");
      return;
    } else if (title === "") {
      setVisible(true);
      setMesssage("Title is Required");
      return;
    } else if (description === "") {
      setVisible(true);
      setMesssage("Description is Required");
      return;
    } else if (mobileNumber === "") {
      setVisible(true);
      setMesssage("Mobile Number is Required");
      return;
    } else if (district === "") {
      setVisible(true);
      setMesssage("District is Required");
      return;
    } else if (stationValue === "") {
      setVisible(true);
      setMesssage("Police Station is Required");
      return;
    } else if (location === "") {
      setVisible(true);
      setMesssage("Location is Required");
      return;
    } else {
      submitHit.current = true;
      DAC.setRegisterFIR({
        user: {
          title: title,
          location: location,
          district: district,
          police_station: stationValue,
          catagory: value,
          mobile_number: Number(mobileNumber),
          description: description,
          is_seen: false,
          username: "",
          created_by: "",
          cnic_number: "",
          datetime: "",
          user: userDetails.id,
        },
        pending: false,
        token: loginUser.token,
        errorMessage: "",
      });
    }
  };
  useEffect(() => {
    if (RegisterFIRPending === true) return;
    if (submitHit.current === true) {
      if (RegisterFIRError !== "") {
        setVisible(true);
        setMesssage(RegisterFIRError);
        return;
      } else if (RegisterFIR.title !== "") {
        navigation.goBack();
      }
    }
  }, [RegisterFIRPending]);

  return (
    <View style={styles(colors.background).container}>
      <Header isDrawer={false} />
      <Text style={styles(colors.heading).coachText}>Register FIR</Text>
      <KeyboardAwareScrollView>
        <View>
          <View style={{ padding: 15 }}>
            <View>
              <Text style={styles(colors.heading).fieldText}>Catagory:</Text>
              <DropDownPicker
                style={{
                  backgroundColor: isDark ? "#0C0C0E" : "#F0F0F0",
                  borderWidth: 0,
                }}
                dropDownContainerStyle={{
                  backgroundColor: isDark ? "#0C0C0E" : "#F0F0F0",
                  marginTop: 10,
                }}
                listItemLabelStyle={{ color: isDark ? "#A8ABB6" : "#585858" }}
                labelStyle={{ color: isDark ? "#A8ABB6" : "#585858" }}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            </View>
            <View>
              <Text style={styles(colors.heading).fieldText}>Title:</Text>
              <TextInput
                style={
                  styles(colors.loginLandingBack, colors.loginInputTextColor)
                    .title
                }
                onChangeText={settitle}
                value={title}
                placeholder="Title"
                keyboardType="default"
              />
            </View>
            <View>
              <Text style={styles(colors.heading).fieldText}>Description:</Text>
              <TextInput
                style={
                  styles(colors.loginLandingBack, colors.loginInputTextColor)
                    .title
                }
                onChangeText={setdescription}
                value={description}
                placeholder="Description"
                keyboardType="default"
              />
            </View>
            <View>
              <Text style={styles(colors.heading).fieldText}>
                Mobile Number:
              </Text>
              <TextInput
                style={
                  styles(colors.loginLandingBack, colors.loginInputTextColor)
                    .title
                }
                onChangeText={setmobileNumber}
                value={mobileNumber}
                placeholder="Mobile Number"
                keyboardType="numeric"
                maxLength={11}
                placeholderTextColor={isDark ? "#a8abb6" : "#585858"}
              />
            </View>
            <View>
              <Text style={styles(colors.heading).fieldText}>District:</Text>
              <TextInput
                style={
                  styles(colors.loginLandingBack, colors.loginInputTextColor)
                    .title
                }
                onChangeText={setDistrict}
                value={district}
                placeholder="District"
                placeholderTextColor={isDark ? "#a8abb6" : "#585858"}
              />
            </View>
            <View>
              <Text style={styles(colors.heading).fieldText}>
                Police Station:
              </Text>
              <DropDownPicker
                style={{
                  backgroundColor: isDark ? "#0C0C0E" : "#F0F0F0",
                  borderWidth: 0,
                }}
                dropDownContainerStyle={{
                  backgroundColor: isDark ? "#0C0C0E" : "#F0F0F0",
                  marginTop: 10,
                }}
                listItemLabelStyle={{ color: isDark ? "#A8ABB6" : "#585858" }}
                labelStyle={{ color: isDark ? "#A8ABB6" : "#585858" }}
                open={stationOpen}
                value={stationValue}
                items={stationItem}
                setOpen={setStationOpen}
                setValue={setStationValue}
                setItems={setStationItem}
              />
            </View>
            <View>
              <Text style={styles(colors.heading).fieldText}>Location:</Text>
              <TextInput
                style={
                  styles(colors.loginLandingBack, colors.loginInputTextColor)
                    .title
                }
                onChangeText={setLocation}
                value={location}
                placeholder="Location"
                placeholderTextColor={isDark ? "#a8abb6" : "#585858"}
              />
            </View>
          </View>
        </View>
        <View style={styles().buttonsView}>
          <TouchableOpacity style={styles().button} onPress={handleSubmit}>
            <Text style={styles().btnText}>Submit FIR</Text>
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
      width: "35%",
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
