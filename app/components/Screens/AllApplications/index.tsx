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
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { CurrentFIRAC } from "../../../store/currentUserFIR/actions";
import { getLoginUserSelector } from "../../../store/loginUser/selector";
import {
  getCurrentFIRPendingSelector,
  getCurrentFIRSelector,
} from "../../../store/currentUserFIR/selector";
import Spinner from "../../Spinner/Spinner";
import { getUserDetailsSelector } from "../../../store/detailInfo/selector";
import { AllFIRAC } from "../../../store/getAllFIR/actions";
import {
  getALLFIRPendingSelector,
  getALLFIRSelector,
} from "../../../store/getAllFIR/selector";

export function AllApplications() {
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
  const userDetails = useSelector(getUserDetailsSelector);
  const loginUser = useSelector(getLoginUserSelector);
  const dispatch = useDispatch();
  const DAC = bindActionCreators(CurrentFIRAC, dispatch);
  const DACALL = bindActionCreators(AllFIRAC, dispatch);
  useEffect(() => {
    DACALL.setAllFIR({ token: loginUser.token });
    DAC.setCurrentFIR({
      token: loginUser.token,
      user_id: userDetails.id,
    });
  }, []);
  let AllFIR = useSelector(getCurrentFIRSelector);
  let AllFIRAdmin = useSelector(getALLFIRSelector);
  const AllFIRPending = useSelector(getCurrentFIRPendingSelector);
  const AllFIRAdminPending = useSelector(getALLFIRPendingSelector);
  console.log(AllFIR);

  return (
    <ScrollView style={styles(colors.background).container}>
      <View style={styles().container}>
        <Header isDrawer={false} />
        {/* <Text style = {styles().heading}>My Profile</Text>       */}
        <View
          style={{
            display: "flex",
            height: 50,
            justifyContent: "center",
          }}
        >
          <Text style={styles().heading}>All Applications</Text>
        </View>
        {userDetails.superuser ? (
          <View>
            {AllFIRAdminPending ? (
              <Spinner />
            ) : (
              <View style={{ margin: 25 }}>
                {AllFIRAdmin?.map((item, ind) => {
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
                          source={require("../../../../assets/images/angle-right-1-32.png")}
                        />
                      </TouchableOpacity>
                      <View style={styles().hr} />
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        ) : (
          <View>
            {AllFIRPending ? (
              <Spinner />
            ) : (
              <View style={{ margin: 25 }}>
                {AllFIR.length > 0 ? (
                  <>
                    {AllFIR?.map((item, ind) => {
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
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
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
                              source={require("../../../../assets/images/angle-right-1-32.png")}
                            />
                          </TouchableOpacity>
                          <View style={styles().hr} />
                        </View>
                      );
                    })}
                  </>
                ) : (
                  <Text style={styles().text}> No FIR Found</Text>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    heading: {
      textAlign: "center",
      color: "black",
      fontSize: 20,
      fontWeight: "700",
    },
    mainView: { flexDirection: "row", justifyContent: "space-between" },
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
      alignSelf: "center",
    },
    text: {
      fontSize: 18,
      color: color,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },

    phone: { color: color, fontSize: 14, marginBottom: 15, marginTop: 15 },
  });
