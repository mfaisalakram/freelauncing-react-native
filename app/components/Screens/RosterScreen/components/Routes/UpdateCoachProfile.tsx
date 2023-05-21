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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  displayHeight,
  displayWidth,
} from '../../../../../utils/commonFunctions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getLoginUserSelector } from '../../../../../store/loginUser/selector';
import { UpdateProfilesAC } from '../../../../../store/updateProfile/actionCreator';
import { UpdatePlayerProfilesPendingSelector } from '../../../../../store/updateProfile/selector';
import { getUserDetailsSelector } from '../../../../../store/detailInfo/selector';
import { useTheme } from '../../../../../utils/themeContext';
import { SvgUpload } from '../../../../../../assets/icons/svg';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageResult } from 'expo-image-manipulator';
import { Camera } from 'expo-camera';
import { ActivityIndicator } from 'react-native-paper';

export function UpdateCoachProfile() {
  const { colors, isDark } = useTheme();
  const dispatch = useDispatch();
  const userDetails = useSelector(getUserDetailsSelector);

  const navigation = useNavigation();

  const [userName, setUserName] = useState(userDetails.first_name);
  const [userEmail, setUserEmail] = useState(userDetails.email);
  const [userLastName, setUserLastName] = useState(userDetails.last_name);
  const [userContact, setUserContact] = useState(userDetails.phone_number);
  const [userProfile, setUserprofile] = useState('');

  const [image, setImage] = useState(userDetails.image_url);
  const submitHit = useRef(false);

  const user = useSelector(getLoginUserSelector);
  const UpdatePlayerProfilePending = useSelector(
    UpdatePlayerProfilesPendingSelector
  );

  const DAC = bindActionCreators(UpdateProfilesAC, dispatch);

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
      setUserprofile(processedImage.base64);
      setImage(processedImage.uri);
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
      profile_picture: userProfile,
    };
    DAC.setUpdateProfiles({
      players: htData,
      access_token: user.access_token,
      token_type: user.token_type,
    });
    navigation.goBack();
  };

  return (
    <View style={styles(colors.background).container}>
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
        <Text style={styles(colors.heading).coachText}>Edit Profile</Text>
        <View style={{ padding: 15 }}>
          <Text style={styles(colors.heading).fieldText}>Update Name:</Text>
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
          <View>
            <Text style={styles(colors.heading).fieldText}>Coach Email:</Text>
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
              Update Phone Number:
            </Text>
            <TextInput
              style={
                styles(colors.playerDetailBack, colors.placeholderColor)
                  .userName
              }
              onChangeText={setUserContact}
              value={userContact}
              placeholder="Phone Number"
              placeholderTextColor={isDark ? '#A8ABB6' : '#585858'}
              keyboardType="numeric"
              returnKeyType={'done'}
            />
          </View>
          <View>
            <Text style={styles(colors.playerDetailField).fieldText}>
              Upload Profile Picture
            </Text>

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
                left: '40%',
                top: '-13%',
              }}
            />
          ) : (
            <Image
              source={require('assets/images/user.png')}
              style={{
                borderRadius: 50,
                width: 50,
                height: 50,
                left: '40%',
                top: '-13%',
              }}
            />
          )}
        </View>
      </View>

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
  );
}

const styles = (color?: string, textColor?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
      flexDirection: 'column',
      width: displayWidth,
      height: displayHeight,
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
      marginTop: '25%',
      flexDirection: 'row',
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
  });
