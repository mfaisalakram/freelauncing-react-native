import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';

import gig1 from '../../../../assets/images/Gigs/gig1.png';
import gig2 from '../../../../assets/images/Gigs/gig3.jpg';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { baseUrl, baseUrlAssetsGigs } from '../../../shared/baseUrl';
import { baseUrlAssets } from '../../../shared/baseUrl';
import { getLoginUserSelector } from '../../../store/loginUser/selector';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActiveServicesAC } from '../../../store/getActiveServices/actions';
import { getActiveServicesSelector } from '../../../store/getActiveServices/selector';
export const gigs = [
  {
    userName: 'Faisal Akram',
    userProfile:
      'https://pps.whatsapp.net/v/t61.24694-24/296258902_595397931991831_4055288452487967571_n.jpg?ccb=11-4&oh=01_AVzWIKLYnI4IgO6eluYg0WdoD_CBlFo8EqhlbgfTIaPkEw&oe=62F97B0C',
    level: 'New Seller',
    packages: [
      {
        title: 'Diamond',
        price: 550,
        description:
          'totam fugit in magnam consequatur. Ipsam ullam, accusantium eos quasi nam illum quia ducimus illo dolor',
        deliveryDays: 10,
        sourceCode: 'yes',
      },
      {
        title: 'Gold',
        price: 350,
        description:
          'totam fugit in magnam consequatur. Ipsam ullam, accusantium eos quasi nam illum quia ducimus illo dolor',
        deliveryDays: 3,
        sourceCode: 'yes',
      },
      {
        title: 'Platinum',
        price: 150,
        description:
          'totam fugit in magnam consequatur. Ipsam ullam, accusantium eos quasi nam illum quia ducimus illo dolor',
        deliveryDays: 20,
        sourceCode: 'no',
      },
    ],
    title: 'Develop dynamic react application',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid debitis officiis excepturi dignissimos et totam fugit in magnam consequatur. Ipsam ullam, accusantium eos quasi nam illum quia ducimus illo dolor?',
    images: [gig1, gig2],
    price: 100,
    raiting: 'Not rated yet',
  },
  {
    userName: 'Faisal Akram',
    userProfile:
      'https://pps.whatsapp.net/v/t61.24694-24/296258902_595397931991831_4055288452487967571_n.jpg?ccb=11-4&oh=01_AVzWIKLYnI4IgO6eluYg0WdoD_CBlFo8EqhlbgfTIaPkEw&oe=62F97B0C',
    level: 'New Seller',
    packages: [
      {
        title: 'Diamond',
        price: 550,
        description:
          'totam fugit in magnam consequatur. Ipsam ullam, accusantium eos quasi nam illum quia ducimus illo dolor',
        deliveryDays: 10,
        sourceCode: 'yes',
      },
      {
        title: 'Gold',
        price: 350,
        description:
          'totam fugit in magnam consequatur. Ipsam ullam, accusantium eos quasi nam illum quia ducimus illo dolor',
        deliveryDays: 3,
        sourceCode: 'yes',
      },
      {
        title: 'Platinum',
        price: 150,
        description:
          'totam fugit in magnam consequatur. Ipsam ullam, accusantium eos quasi nam illum quia ducimus illo dolor',
        deliveryDays: 20,
        sourceCode: 'no',
      },
    ],
    title: 'Responsive frontend website or application',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid debitis officiis excepturi dignissimos et totam fugit in magnam consequatur. Ipsam ullam, accusantium eos quasi nam illum quia ducimus illo dolor?',
    images: [gig2, gig1],
    price: 100,
    raiting: 4.5,
  },
];

export type ParamList = {
  GigDetail: {
    clickedTitle: string;
    clickedUserName: string;
  };
};

const GigsListPage = () => {
  const loginUser = useSelector(getLoginUserSelector);
  const allActiveServices = useSelector(getActiveServicesSelector);
  const [res, setRes] = useState([]);
  const [clickedTitle, seClickedTitle] = useState('');
  const [clickedUserName, seClickedUserName] = useState('');

  const dispatch = useDispatch();

  const ASD = bindActionCreators(ActiveServicesAC, dispatch);

  const getAllActiveServices = async () => {
    const response = await axios.get(
      `${baseUrl}api/service/user/services/active`,
      {
        headers: {
          'x-auth-token': loginUser?.token,
        },
      }
    );

    if (response.data.found === true) {
      setRes(response.data.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    getAllActiveServices();
  }, []);

  const navigation = useNavigation();
  const navigateTo = (screen: any) => {
    const dt = {
      name: screen,
      key: undefined,
      params: {
        clickedTitle: clickedTitle,
        clickedUserName: clickedUserName,
      },
      merge: undefined,
    } as any;
    navigation.navigate(dt);
  };

  return (
    <ScrollView style={{ backgroundColor: '#ffff' }}>
      {res.length <= 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <Text
            style={{
              marginTop: '50%',
            }}
          >
            No Active Gigs Yet
          </Text>
        </View>
      ) : (
        <>
          {res?.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.singleGigView}
                key={index}
                onPress={() => {
                  seClickedUserName(item?.username);
                  seClickedTitle(item?.url_title);
                  // console.log(clickedUserName, clickedTitle);
                  navigateTo('GigDetail');
                  // navigation.navigate('GigDetail', {
                  //   clickedTitle: clickedTitle,
                  //   clickedUserName: clickedUserName,
                  // });
                }}
              >
                <Image
                  source={{
                    uri: `${baseUrlAssetsGigs}${item.images.split(',')[0]}`,
                  }}
                  style={styles.image}
                  resizeMode={'contain'}
                />
                <View style={{ marginLeft: 15 }}>
                  <View style={styles.titleView}>
                    <Text style={styles.title}>{item?.title}</Text>
                  </View>

                  <View style={styles.price}>
                    <Text style={{ color: 'gray' }}> From: </Text>
                    <Text style={{ fontWeight: '700', fontSize: 17 }}>
                      ${item?.price}10
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </>
      )}
    </ScrollView>
  );
};

export default GigsListPage;

const styles = StyleSheet.create({
  image: { width: '40%', height: '100%' },
  singleGigView: {
    padding: 0,
    margin: 5,
    borderWidth: 1.5,
    borderColor: '#F2F2F2',
    borderRadius: 4,
    flexDirection: 'row',
    height: 100,
  },
  raiting: { color: 'gray' },
  title: { width: '70%', fontWeight: '500' },
  price: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 20,
    textAlign: 'right',
    marginBottom: 5,
  },
  titleView: {
    flexDirection: 'row',
  },
});
