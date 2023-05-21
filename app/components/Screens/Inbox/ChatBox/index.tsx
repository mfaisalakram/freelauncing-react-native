import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from '../../Utils/colors';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { getLoginUserSelector } from '../../../../store/loginUser/selector';
import { useSelector } from 'react-redux';
import { baseUrl, baseUrlAssets } from '../../../../shared/baseUrl';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import imgPlaceholder from '../../../../../assets/images/user.png';
import { useInterval } from 'usehooks-ts';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { getUserDetailsSelector } from '../../../../store/detailInfo/selector';

const ChatBox = () => {
  const [attachment, setAttachment] = useState(false);
  const [message, setMesssage] = useState('');
  const loginUser = useSelector(getLoginUserSelector);
  const [chatData, setchatData] = useState([]);
  const userData = useSelector(getUserDetailsSelector);
  const route = useRoute();
  const navigation = useNavigation();
  const scrollViewRef = useRef();

  const getAllMessagesApi = async () => {
    const response = await axios.get(
      `${baseUrl}api/chatapp/get-messages/${route.params.userName}`,
      {
        headers: {
          'x-auth-token': loginUser?.token,
        },
      }
    );
    if (response?.data?.chatdata?.messages !== undefined) {
      setchatData(response?.data?.chatdata?.messages);
    } else {
      return;
    }
  };
  const sendMessage = async () => {
    const config = {
      headers: {
        'x-auth-token': loginUser?.token,
      },
    };
    let data = {
      msg: message,
      receiver: route.params.userName,
      time: new Date().toString(),
      type: 'plain',
    };

    const response = await axios.post(
      `${baseUrl}api/chatapp/add-message`,
      data,
      config
    );
    if (response.data.msg === 'send message Success') {
    }
  };

  useInterval(() => {
    getAllMessagesApi();
  }, 1000);

  useEffect(() => {
    getAllMessagesApi();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 22 }}>{route.params.userName}</Text>
          {route?.params?.fromGigDetail === false ||
          route?.params?.fromGigDetail === undefined ? (
            <Image
              source={{
                uri:
                  route.params.userImage === undefined
                    ? imgPlaceholder
                    : `${baseUrlAssets}assets/uploads/users/${route.params.userName}/profileImages/${route.params.userImage}`,
              }}
              style={{ width: 55, height: 55, borderRadius: 50 }}
            />
          ) : (
            <Image
              source={{
                uri:
                  route.params.userImage === undefined
                    ? imgPlaceholder
                    : `${baseUrlAssets}${route.params.userImage}`,
              }}
              style={{ width: 55, height: 55, borderRadius: 50 }}
            />
          )}
        </View>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {chatData.map((item, index) => {
            return (
              <>
                {item?.sender === userData?.username ? (
                  <View key={index} style={styles.singleMessageViewMy}>
                    <View
                      style={{
                        marginRight: 10,
                        backgroundColor: '#f5e4cb',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        borderTopRightRadius: 0,
                        maxWidth: '75%',
                        marginTop: 20,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={styles.name}>{item?.sender}</Text>
                        <Text style={styles.date}>
                          {moment(item?.time).format('MMM Do YY')}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '90%',
                        }}
                      >
                        <>
                          {item?.type === 'plain' ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                              }}
                            >
                              <Text style={{ color: '#7c868f' }}>
                                {item.text}
                              </Text>
                            </View>
                          ) : (
                            <Entypo
                              name="text-document"
                              size={24}
                              color="black"
                            />
                          )}
                        </>
                      </View>
                    </View>
                    <Image
                      source={{
                        uri:
                          item?.sender !== userData.username
                            ? route.params.userImage === undefined
                              ? imgPlaceholder
                              : `${baseUrlAssets}assets/uploads/users/${route.params.userName}/profileImages/${route.params.userImage}`
                            : route.params.userImage === undefined
                            ? imgPlaceholder
                            : `${baseUrlAssets}assets/uploads/users/${userData.username}/profileImages/${userData.profile_image}`,
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        marginRight: 15,
                        marginTop: 5,
                      }}
                    />
                  </View>
                ) : (
                  <View key={index} style={styles.singleMessageView}>
                    {route?.params?.fromGigDetail === false ||
                    route?.params?.fromGigDetail === undefined ? (
                      <Image
                        source={{
                          uri:
                            item?.sender !== userData.username
                              ? route.params.userImage === undefined
                                ? imgPlaceholder
                                : `${baseUrlAssets}assets/uploads/users/${route.params.userName}/profileImages/${route.params.userImage}`
                              : route.params.userImage === undefined
                              ? imgPlaceholder
                              : `${baseUrlAssets}assets/uploads/users/${userData.username}/profileImages/${userData.profile_image}`,
                        }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          marginRight: 15,
                          marginTop: 5,
                        }}
                      />
                    ) : (
                      <Image
                        source={{
                          uri:
                            item?.sender !== userData.username
                              ? route.params.userImage === undefined
                                ? imgPlaceholder
                                : `${baseUrlAssets}${route.params.userImage}`
                              : route.params.userImage === undefined
                              ? imgPlaceholder
                              : `${baseUrlAssets}assets/uploads/users/${userData.username}/profileImages/${userData.profile_image}`,
                        }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          marginRight: 15,
                          marginTop: 5,
                        }}
                      />
                    )}
                    <View
                      style={{
                        backgroundColor: '#ecf0f1',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        borderTopLeftRadius: 0,
                        maxWidth: '75%',
                        marginTop: 20,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={styles.name}>{item?.sender}</Text>
                        <Text style={styles.date}>
                          {moment(item?.time).format('MMM Do YY')}
                        </Text>
                      </View>
                      <View style={{ width: '90%' }}>
                        <>
                          {item?.type === 'plain' ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                              }}
                            >
                              <Text style={{ color: '#7c868f' }}>
                                {item.text}
                              </Text>
                            </View>
                          ) : (
                            <Entypo
                              name="text-document"
                              size={24}
                              color="black"
                            />
                          )}
                        </>
                      </View>
                    </View>
                  </View>
                )}
              </>
            );
          })}
        </ScrollView>
        <View style={styles.sendMessageView}>
          {attachment ? (
            <View
              style={{ position: 'absolute', top: 0, backgroundColor: 'gray' }}
            >
              <Text>Attachment</Text>
            </View>
          ) : (
            <></>
          )}
          <Feather
            name="paperclip"
            size={24}
            color="black"
            onPress={() => setAttachment(!attachment)}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Message..."
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            blurOnSubmit={false}
            secureTextEntry={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
            onChangeText={(msg) => setMesssage(msg)}
            value={message}
          />
          <TouchableOpacity
            onPress={() => {
              if (message.length > 0) {
                sendMessage();
                setMesssage('');
              } else {
                return;
              }
            }}
          >
            {message.length > 0 ? (
              <Ionicons name="send" size={24} color="black" />
            ) : (
              <Ionicons name="send-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    backgroundColor: '#ecf0f1',
  },

  sendMessageView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    position: 'relative',
  },

  inputStyle: {
    flex: 1,
    color: 'gray',
    padding: 5,
    borderBottomWidth: 2,
    borderColor: '#dadae8',
    borderWidth: 2,
    borderRadius: 50,
    marginHorizontal: 10,
    paddingLeft: 20,
  },
  singleMessageViewMy: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'flex-end',
  },
  singleMessageView: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
  },
  name: {
    fontWeight: 'bold',
    marginRight: 10,
    marginTop: 0,
  },
  date: {
    color: 'gray',
    fontSize: 11,
  },
});

export default ChatBox;
