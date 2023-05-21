import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { displayWidth } from '../../../../../utils/commonFunctions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getLoginUserSelector } from '../../../../../store/loginUser/selector';
import { UpdatePlayerProfilesPendingSelector } from '../../../../../store/updateProfile/selector';
import { getUserDetailsSelector } from '../../../../../store/detailInfo/selector';
import { useTheme } from '../../../../../utils/themeContext';
import {
  SvgCheckBox,
  SvgUnCheck,
  SvgUpload,
} from '../../../../../../assets/icons/svg';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageResult } from 'expo-image-manipulator';
import { Camera } from 'expo-camera';
import { ActivityIndicator } from 'react-native-paper';
import { UpdatePlayerProfilesAC } from '../../../../../store/updatePlayerProfile/actionCreator';
import { UpdatePlayerDatasAC } from '../../../../../store/updatePlayerData/actionCreator';
import { GetPlayerProfilesSelector } from '../../../../../store/getPlayerData/selector';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getCoachGetOwnTeamSelector } from '../../../../../store/getCoachTeam/coach_get_own_team';
import moment from 'moment';

export function UpdatePlayerProfile() {
  const { colors, isDark } = useTheme();
  const dispatch = useDispatch();
  const userDetails = useSelector(getUserDetailsSelector);
  const GetPlayer = useSelector(GetPlayerProfilesSelector);
  const navigation = useNavigation();
  const coachData = useSelector(getCoachGetOwnTeamSelector);

  const [userName, setUserName] = useState(userDetails.first_name);
  const [weight, setWeight] = useState(GetPlayer.players.weight);
  const [height, setHeight] = useState(GetPlayer.players.height);
  const [userEmail, setUserEmail] = useState(userDetails.email);
  const [userLastName, setUserLastName] = useState(userDetails.last_name);
  const [userContact, setUserContact] = useState(userDetails.phone_number);
  const [userJersey, setUserJersey] = useState(GetPlayer.players.jersey);
  const [dob, setDob] = useState(GetPlayer.players.birthdate);
  const [HomeTown, setHomeTown] = useState(GetPlayer.players.hometown);
  const [userPosition, setUserPosition] = useState(GetPlayer.players.position);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(userPosition);
  const [items, setItems] = useState([
    { label: 'Defense', value: 'Defense' },
    { label: 'Goalie', value: 'Goalie' },
    { label: 'Centre', value: 'Center' },
    { label: 'Left wing', value: 'Leftwing' },
    { label: 'Right Wing', value: 'Rightwing' },
  ]);
  const [image, setImage] = useState(userDetails.image_url);
  const [userProfile, setUserprofile] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [getDate, setGetDate] = useState(GetPlayer.players.birthdate);

  const submitHit = useRef(false);

  const [click, setClick] = React.useState(false);
  const [unClick, setUnClick] = React.useState(true);
  const [checked, setChecked] = React.useState('');

  useEffect(() => {
    if (GetPlayer.players.shoots === 'left') {
      setClick(true);
      setUnClick(false);
      setChecked('left');
    } else if (GetPlayer.players.shoots === 'right') {
      setClick(false);
      setUnClick(true);
      setChecked('right');
    }
  }, []);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setGetDate(date);
    hideDatePicker();
  };

  const user = useSelector(getLoginUserSelector);
  const UpdatePlayerProfilePending = useSelector(
    UpdatePlayerProfilesPendingSelector
  );

  const DAC = bindActionCreators(UpdatePlayerProfilesAC, dispatch);
  const DACAll = bindActionCreators(UpdatePlayerDatasAC, dispatch);

  const askForPermission = async () => {
    const permissionResult = await Camera.requestCameraPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      Alert.alert('no permissions to access camera!', 'ok');
      return false;
    }
    return true;
  };

  const getImageFromCamera = async () => {
    try {
      const hasPermission = await askForPermission();
      if (!hasPermission) {
        console.log('No Permissions');
        return;
      }
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!capturedImage.cancelled) {
        //@ts-ignore
        processImage(capturedImage.uri);
      }
    } catch (ex) {
      console.log('Exception in Opening Camera as', ex);
    }
  };

  const getImageFromGallery = async () => {
    try {
      const hasPermission = await askForPermission();
      if (!hasPermission) {
        console.log('No Permissions');
        return;
      }
      const galleryImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true,
      });
      if (!galleryImage.cancelled) {
        // @ts-ignore
        processImage(galleryImage.uri);
      }
    } catch (ex) {
      console.log('Exception in Opening Camera as', ex);
    }
  };

  const processImage = async (imageUri) => {
    try {
      let processedImage = (await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 400 } }],
        { format: 'jpeg' as any, base64: true }
      )) as ImageResult;
      setImage(processedImage.uri);
      setUserprofile(processedImage.base64);
    } catch (ex) {
      console.log('Exception in processImage', ex);
    }
  };

  const handleSubmit = () => {
    submitHit.current = true;
    const htData = {
      first_name: userName,
      last_name: userLastName,
      email: userEmail,
      phone_number: userContact,
      first_time: '',
    };
    DAC.setUpdatePlayerProfiles({
      players: htData,
      access_token: user.access_token,
      token_type: user.token_type,
      user_id: Number(userDetails.user_id),
    });
    DACAll.setUpdatePlayerDatas({
      players: {
        shoots: checked,
        weight: weight,
        height: height,
        birthdate: getDate !== ' ' ? getDate : dob,
        hometown: HomeTown,
        picture: userProfile,
        jersey: userJersey,
        position: value,
        is_active: true,
        required: '',
      },
      access_token: user.access_token,
      token_type: user.token_type,
      user_id: Number(userDetails.user_id),
    });
    navigation.goBack();
  };

  return (
    <View style={styles(colors.background).container}>
      <KeyboardAwareScrollView>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={styles().coachView}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={28}
              color={isDark ? '#ffff' : '#07243F'}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles().imageView}>
            <Image
              source={
                isDark
                  ? require('@app/assets/images/darklogo.png')
                  : require('@app/assets/images/mini-logo.png')
              }
              style={styles().image}
            />
          </View>
        </View>
        <View>
          <Text style={styles(colors.heading).coachText}>Edit Player</Text>
          <View style={{ padding: 15 }}>
            <Text style={styles(colors.heading).fieldText}>
              Update Player Name:
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <TextInput
                style={
                  styles(colors.playerDetailBack, colors.placeholderColor)
                    .textName
                }
                onChangeText={setUserName}
                value={userName}
                placeholder="First Name"
                keyboardType="default"
                placeholderTextColor={isDark ? '#A8ABB6' : '#585858'}
              />
              <TextInput
                style={
                  styles(colors.playerDetailBack, colors.placeholderColor)
                    .textName
                }
                onChangeText={setUserLastName}
                value={userLastName}
                placeholder="Last Name"
                keyboardType="default"
                placeholderTextColor={isDark ? '#A8ABB6' : '#585858'}
              />
            </View>
            {coachData?.team_detail.height === true ||
            coachData?.team_detail.weight === true ? (
              <>
                <Text style={styles(colors.heading).fieldText}>
                  Weight / Height
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  {coachData?.team_detail.weight === true ? (
                    <TextInput
                      style={
                        styles(colors.playerDetailBack, colors.placeholderColor)
                          .textNameWeight
                      }
                      onChangeText={setWeight}
                      value={weight}
                      placeholder="Weight"
                      keyboardType="numeric"
                      placeholderTextColor={isDark ? '#A8ABB6' : '#585858'}
                      maxLength={3}
                    />
                  ) : (
                    <></>
                  )}
                  {coachData?.team_detail.height ? (
                    <TextInput
                      style={
                        styles(colors.playerDetailBack, colors.placeholderColor)
                          .textNameWeight
                      }
                      onChangeText={setHeight}
                      value={height}
                      placeholder="Height"
                      keyboardType="numeric"
                      placeholderTextColor={isDark ? '#A8ABB6' : '#585858'}
                      maxLength={3}
                    />
                  ) : (
                    <></>
                  )}
                </View>
              </>
            ) : (
              <></>
            )}
            <View>
              <Text style={styles(colors.heading).fieldText}>
                Update Player Email:
              </Text>
              <TextInput
                style={
                  styles(colors.playerDetailBack, colors.placeholderColor)
                    .userName
                }
                onChangeText={setUserEmail}
                value={userEmail}
                placeholder="Email"
                keyboardType="default"
                placeholderTextColor={isDark ? '#A8ABB6' : '#585858'}
                editable={false}
              />
            </View>
            <View>
              <Text style={styles(colors.heading).fieldText}>
                Update Player Phone Number:
              </Text>
              <TextInput
                style={
                  styles(colors.playerDetailBack, colors.placeholderColor)
                    .userName
                }
                onChangeText={setUserContact}
                value={userContact}
                placeholder="Phone Number"
                keyboardType="numeric"
                placeholderTextColor={isDark ? '#A8ABB6' : '#585858'}
              />
            </View>
            <View>
              <Text style={styles(colors.heading).fieldText}>
                Update Jersey Number:
              </Text>
              <TextInput
                style={
                  styles(colors.playerDetailBack, colors.placeholderColor)
                    .userName
                }
                onChangeText={setUserJersey}
                value={userJersey}
                placeholder="Jersey Number"
                placeholderTextColor={isDark ? '#A8ABB6' : '#585858'}
                maxLength={2}
                keyboardType="numeric"
              />
            </View>
            {coachData?.team_detail.hometown === true ? (
              <View>
                <Text style={styles(colors.heading).fieldText}>
                  Update Home Town:
                </Text>
                <TextInput
                  style={
                    styles(colors.playerDetailBack, colors.placeholderColor)
                      .userName
                  }
                  onChangeText={setHomeTown}
                  value={HomeTown}
                  placeholder="Home Town"
                  placeholderTextColor={isDark ? '#A8ABB6' : '#585858'}
                />
              </View>
            ) : (
              <></>
            )}
            {coachData?.team_detail.birthdate === true ? (
              <View>
                <Text style={styles(colors.playerDetailField).fieldText}>
                  Date of Birth:
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={styles(colors.playerDetailBack).datepicker}
                    onPress={() => {
                      showDatePicker();
                    }}
                  >
                    <Text style={{ color: isDark ? '#a8abb6' : '#585858' }}>
                      {getDate !== ''
                        ? moment(getDate).format('DD-MM-YYYY')
                        : 'Pick Date'}
                    </Text>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    textColor={isDark ? '#a8abb6' : '#585858'}
                  />
                </View>
              </View>
            ) : (
              <></>
            )}
            {coachData?.team_detail.shoots === true ? (
              <View>
                <Text style={styles(colors.playerDetailField).fieldText}>
                  Shoots (Left/Right):
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 100,
                    borderRadius: 6,
                    borderColor: '#07243F',
                  }}
                >
                  {/* <View style = {{flexDirection : 'row'}}> */}
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ top: 7, marginLeft: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          setChecked('left');
                          setClick(true);
                          setUnClick(false);
                        }}
                      >
                        {click ? <SvgCheckBox /> : <SvgUnCheck />}
                        {/* </TouchableOpacity> */}
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={styles(colors.playerDetailField).leftRightText}
                    >
                      Left
                    </Text>
                    {/* </View> */}
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ top: 7, marginLeft: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          setChecked('right');
                          setClick(false);
                          setUnClick(true);
                        }}
                      >
                        {unClick ? <SvgCheckBox /> : <SvgUnCheck />}
                        {/* </TouchableOpacity> */}
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={styles(colors.playerDetailField).leftRightText}
                    >
                      Right
                    </Text>
                    {/* </View> */}
                  </View>
                </View>
              </View>
            ) : (
              <></>
            )}

            <View style={{ marginTop: 15 }}>
              <Text style={styles(colors.heading).fieldText}>
                Update Position:
              </Text>

              <View style={{ marginBottom: 10 }}>
                <DropDownPicker
                  style={{
                    display: 'flex',
                    paddingLeft: 25,
                    marginTop: 10,
                    backgroundColor: isDark ? '#0C0C0E' : '#F0F0F0',
                    borderWidth: 0,
                  }}
                  containerStyle={{
                    width: '35%',
                    display: 'flex',
                    marginTop: 10,
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: isDark ? '#0C0C0E' : '#F0F0F0',
                    borderWidth: 1.2,
                    borderColor: isDark ? '#0C0C0E' : '#F0F0F0',
                    borderTopColor: isDark ? '#28292D' : '#ffff',
                    marginTop: 10,
                    padding: 0,
                  }}
                  listItemLabelStyle={{ color: isDark ? '#A8ABB6' : '#585858' }}
                  labelStyle={{ color: isDark ? '#A8ABB6' : '#585858' }}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  showArrowIcon={false}
                  dropDownDirection="TOP"
                />
                <AntDesign
                  style={styles().arrowLogo}
                  name={open ? 'down' : 'up'}
                  size={16}
                  color={isDark ? '#A8ABB6' : '#585858'}
                />
              </View>
            </View>
            {coachData?.team_detail.picture === true ? (
              <>
                <View>
                  <Text style={styles(colors.playerDetailField).fieldText}>
                    Upload Profile Picture
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={getImageFromGallery}>
                      <View style={styles(colors.playerDetailBack).uploadLogo}>
                        <SvgUpload />
                        <Text
                          style={{
                            fontSize: 12,
                            color: isDark ? '#a8abb6' : '#585858',
                          }}
                        >
                          Upload Photo
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={{
                        borderRadius: 50,
                        width: 50,
                        height: 50,
                        left: '45%',
                        top: '-30%',
                      }}
                    />
                  ) : (
                    <Image
                      source={require('assets/images/user.png')}
                      style={{
                        borderRadius: 50,
                        width: 50,
                        height: 50,
                        left: '45%',
                        top: '-30%',
                      }}
                    />
                  )}
                </View>
              </>
            ) : (
              <></>
            )}
            <View style={styles().buttonsView}>
              <TouchableOpacity style={styles().button} onPress={handleSubmit}>
                {UpdatePlayerProfilePending ? (
                  <ActivityIndicator color="white" size={24} />
                ) : (
                  <Text style={styles().btnText}>Update Profile</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles().button}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles().btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = (color?: string, textColor?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
      flexDirection: 'column',
      width: displayWidth,
      // height: 1000,
    },
    uploadLogo: {
      display: 'flex',
      flexDirection: 'row',
      width: 120,
      height: 35,
      justifyContent: 'space-evenly',
      borderRadius: 12,
      backgroundColor: color,
      alignItems: 'center',
      marginLeft: 8,
      marginTop: 2,
    },
    buttonsView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10%',
      marginBottom: 5,
      flexDirection: 'row',
    },
    datepicker: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: color,
      width: 100,
      height: 25,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 15,
      marginTop: 8,
    },
    coachView: {
      width: '40%',
      justifyContent: 'center',
      marginTop: 50,
      paddingLeft: 10,
    },
    coachText: {
      textAlign: 'center',
      fontSize: 18,
      color: color,
      fontWeight: 'bold',
      marginTop: 15,
    },
    icon: {
      alignItems: 'center',
      color: 'black',
      fontSize: 24,
      paddingTop: 7,
    },
    arrowLogo: {
      position: 'absolute',
      top: 38,
      left: '36%',
    },
    button: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#07243F',
      width: 120,
      height: 38,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      marginLeft: 25,
      marginRight: 25,
    },
    loginButton: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#F0F0F0',
      width: 280,
      height: 38,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    forgetText: {
      textAlign: 'center',
      color: '#07243F',
      paddingTop: 15,
      textDecorationLine: 'underline',
    },
    btnText: {
      color: '#fff',
    },
    loginTxt: {
      color: '#000',
    },
    text: {
      paddingBottom: 25,
    },
    imageView: {
      alignItems: 'center',
      marginTop: '10%',
      justifyContent: 'center',
    },
    image: { width: 60, height: 46 },
    fieldText: { padding: 8, color: color },
    textName: {
      height: 42,
      width: '47%',
      backgroundColor: color,
      color: textColor,
      paddingLeft: 10,
      borderRadius: 6,
      fontSize: 12,
    },
    textNameWeight: {
      height: 42,
      width: '47%',
      backgroundColor: color,
      color: textColor,
      paddingLeft: 10,
      borderRadius: 6,
      fontSize: 12,
    },
    userName: {
      height: 42,
      width: '97%',
      backgroundColor: color,
      color: textColor,
      paddingLeft: 10,
      borderRadius: 6,
      marginLeft: 5,
      fontSize: 12,
    },
    leftRightText: { color: color, top: 8, marginLeft: 5 },
  });
