import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../../Utils/colors';
import axios from 'axios';
import { baseUrl, baseUrlAssetsGigs } from '../../../../shared/baseUrl';
import { useSelector } from 'react-redux';
import { getLoginUserSelector } from '../../../../store/loginUser/selector';
import { getUserDetailsSelector } from '../../../../store/detailInfo/selector';
import { useNavigation } from '@react-navigation/native';

const Active = () => {
  const loginUser = useSelector(getLoginUserSelector);
  const userDetail = useSelector(getUserDetailsSelector);
  const [orderList, setOrderList] = useState([]);
  const [orderId, setOrderId] = useState('');
  const navigation = useNavigation();
  const navigateTo = (screen: any) => {
    const dt = {
      name: screen,
      key: undefined,
      params: { orderId: orderId },
      merge: undefined,
    } as any;
    navigation.navigate(dt);
  };

  const getAllOrderApi = async () => {
    const response = await axios.get(`${baseUrl}api/orders/by-status/active`, {
      headers: {
        'x-auth-token': loginUser?.token,
      },
    });
    if (response?.data?.found === true) {
      setOrderList(response?.data?.data);
    } else {
      setOrderList([]);
    }
  };
  useEffect(() => {
    getAllOrderApi();
  }, []);
  return (
    <View style={styles.container}>
      {orderList.length > 0 ? (
        <>
          {orderList.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.gigContent}
                key={index}
                onPress={() => {
                  setOrderId(item?.order_id);
                  navigateTo('SingleOrder');
                }}
              >
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                  <Image
                    source={{
                      uri:
                        item?.title ===
                        'I will be your full stack developer in react js nodejs firebase'
                          ? `${baseUrlAssetsGigs}/assets/uploads/users/faisalakram/serviceImages/2022-08-27 3-16-02-1I will be your full stack developer in react js nodejs firebase.png`
                          : `${baseUrlAssetsGigs}/assets/uploads/users/faisalakram/serviceImages/2022-08-27 3-02-33-1I will do job of mern stack developer create integrate API and chat.png`,
                    }}
                    style={styles.image}
                  />
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text style={styles.price}>
                        ${Math.trunc(item.amount)}
                      </Text>
                      <Text style={styles.offer}>Custom Offer</Text>
                    </View>
                    <Text>{item.title}</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: 10,
                  }}
                >
                  <View style={{ marginRight: 10 }}>
                    <Image
                      source={{
                        uri: `${baseUrlAssetsGigs}${item.buyer_profile_photo}`,
                      }}
                      style={styles.userImage}
                    />
                    <View style={styles.badge} />
                  </View>
                  <Text style={{ color: colors.light }}>
                    {item.seller_username}
                  </Text>
                </View>

                <View style={styles.bottomArea}>
                  <Text style={styles.date}>Nov 2, 2020</Text>
                  <Text style={styles.revision}>IN REVISION</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </>
      ) : (
        <View>
          <Text style={{ marginTop: '50%', textAlign: 'center' }}>
            No Order Yet 😥
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  gigContent: {
    backgroundColor: colors.white,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  price: {
    // fontFamily: 'RobotoMedium',
    fontSize: 15,
  },
  bottomArea: {
    borderTopColor: colors.light,
    borderTopWidth: 0.5,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  offer: {
    color: colors.light,
    textTransform: 'uppercase',
  },
  date: {
    // fontFamily: 'RobotoMedium',
  },
  revision: {
    fontSize: 11,
    color: colors.blue,
  },
  userImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#000000',
    position: 'relative',
  },
  badge: {
    width: 10,
    height: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    position: 'absolute',
    left: 18,
    bottom: 0,
    zIndex: 1,
    borderWidth: 2,
    borderColor: colors.white,
  },
});

export default Active;
