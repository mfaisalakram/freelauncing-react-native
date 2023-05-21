import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import { AntDesign } from '@expo/vector-icons';
import { gigs, ParamList } from '../GigsList';
import { SliderBox } from 'react-native-image-slider-box';
import GigPackageTabView from './tab-bar';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  baseUrl,
  baseUrlAssets,
  baseUrlAssetsGigs,
} from '../../../shared/baseUrl';
import { getLoginUserSelector } from '../../../store/loginUser/selector';
import Spinner from '../../Spinner/Spinner';
import colors from '../Utils/colors';
import SingerBuyerGig from '../../SingerBuyerGig/SingerBuyerGig';
import { useScrollToTop } from '@react-navigation/native';
import { getUserDetailsSelector } from '../../../store/detailInfo/selector';
const GigDetailPage = () => {
  const [packag, setPackage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, serUserName] = useState('');
  const [html, setHtml] = useState('<p>bule</p>');
  const route = useRoute<RouteProp<ParamList, 'GigDetail'>>();

  const loginUser = useSelector(getLoginUserSelector);
  const userDetail = useSelector(getUserDetailsSelector);
  const ref = useRef(null);

  const [gigDetail, setGigDetail] = useState({});
  const [serviceLoading, setserviceLoading] = useState(true);
  const [clickedTitlee, setClickedTitlee] = useState('');
  const [clickedUserNamee, setClickedUserNamee] = useState('');
  const [img, setImg] = useState('');
  const navigation = useNavigation();
  const navigateTo = (screen: any) => {
    const dt = {
      name: screen,
      key: undefined,
      params: {
        clickedTitle: clickedTitlee,
        clickedUserName: clickedUserNamee,
        userName: userName,
        userImage: img,
        fromGigDetail: true,
        sender: userDetail.username,
      },
      merge: undefined,
    } as any;
    navigation.navigate(dt);
  };
  const getGigDetail = async () => {
    let userName = route.params.clickedUserName;
    let title = route.params.clickedTitle;

    const response = await axios.get(
      `${baseUrl}api/service/${userName}/${title}`,
      {
        headers: {
          'x-auth-token': loginUser?.token,
        },
      }
    );
    if (response.data.found) {
      const resdata = response?.data?.data[0];
      let imgArray = [];

      resdata?.images?.split(',').forEach(async (element) => {
        imgArray?.push(baseUrlAssetsGigs + element);
      });
      setserviceLoading(false);

      setGigDetail({
        ...resdata,
        gigimages: imgArray,
      });

      // console.log(html);
    }
  };
  useEffect(() => {
    setHtml(gigDetail?.description);
  }, [gigDetail]);

  useEffect(() => {
    getGigDetail();
  }, []);

  useEffect(() => {
    if (route?.params?.refresh === 'refresh') {
      getGigDetail();
    } else {
      return;
    }
  }, [route?.params?.ref === 'ref']);
  return (
    <ScrollView>
      {serviceLoading ? (
        <View style={{ marginTop: '50%' }}>
          <Spinner />
        </View>
      ) : (
        <>
          <SliderBox
            images={
              gigDetail?.gigimages
                ? gigDetail?.gigimages
                : ['https://miro.medium.com/max/672/0*vMs9JeIK3JG23Y-Y.jpg']
            }
            style={{ width: '100%', height: 200 }}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            onPress={() => setModalVisible(true)}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                source={{
                  uri: `${baseUrlAssetsGigs}${gigDetail?.profile_image}`,
                }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  marginRight: 10,
                }}
              />

              <View>
                <Text>
                  {gigDetail?.fname} {gigDetail?.lname}
                </Text>
                <Text style={{ color: 'gray' }}>{gigs[0].level}</Text>
              </View>
              {userDetail?.username !== gigDetail?.username && (
                <TouchableOpacity
                  onPress={() => {
                    // setUserImage(item?.image);
                    // setSender(item?.messages?.sender);
                    serUserName(gigDetail?.username);
                    setImg(gigDetail?.profile_image);
                    navigateTo('ChatBox');
                  }}
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: colors.primary,
                    marginLeft: 18,
                    paddingHorizontal: 4,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                    }}
                  >
                    Contact Seller
                  </Text>
                  <AntDesign
                    name="message1"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 10 }}
                  />
                </TouchableOpacity>
              )}
            </View>
            <AntDesign name="down" size={16} color="gray" />
          </TouchableOpacity>
          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: '700',
                width: '100%',
                color: colors.secondary,
              }}
            >
              {gigDetail?.title}
            </Text>
            <Text
              style={{
                marginTop: 20,
                fontSize: 20,
                textAlign: 'left',
                fontWeight: '700',
                color: colors.primary,
              }}
            >
              About Service
            </Text>
            {/* <RenderHTML source={{ html }} /> */}
            <Text>
              {gigDetail?.description?.replace(/<\/?[^>]+(>|$)/g, '')}
            </Text>
          </View>
          <View style={styles().moreServicesView}>
            <Text style={styles().moreServicesText}>
              More services from{' '}
              <Text style={styles().moreServicesUserName}>
                {gigDetail?.username}
              </Text>{' '}
            </Text>
            {gigDetail?.otherServices ? (
              <ScrollView horizontal style={{ flexDirection: 'row' }}>
                {gigDetail?.otherServices.map((item, index) => {
                  return (
                    <SingerBuyerGig
                      key={index}
                      img={item?.images.split(',')[0]}
                      title={item?.title}
                      raiting={item?.raiting}
                      price={item?.price}
                      username={item?.username}
                      profileImage={item?.profile_image}
                      usernameClick={item?.username}
                      titleClick={item?.url_title}
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <></>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default GigDetailPage;
const styles = () =>
  StyleSheet.create({
    PackagesTabsView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#f0f0f0',
    },
    packageContentView: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    packageHeading: { fontSize: 18, fontWeight: '600' },
    PackagesTabsText: {
      color: 'gray',
      fontSize: 20,
      fontWeight: '500',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 2.5,
      marginBottom: -1,
    },
    moreServicesView: {
      paddingHorizontal: 10,
    },
    moreServicesText: {
      fontSize: 20,
    },
    moreServicesUserName: {
      color: colors.primary,
      textDecorationLine: 'underline',
    },
  });
