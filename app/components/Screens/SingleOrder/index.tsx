import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import axios from 'axios';
import { getLoginUserSelector } from '../../../store/loginUser/selector';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { baseUrl, baseUrlAssets } from '../../../shared/baseUrl';
import colors from '../Utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';

const SingleOrder = () => {
  const route = useRoute();
  const loginUser = useSelector(getLoginUserSelector);
  const [orderData, setOrderData] = useState({});

  const getOrderDataApi = async () => {
    const response = await axios.get(
      `${baseUrl}api/orders/order-by-id/${route?.params?.orderId}`,
      {
        headers: {
          'x-auth-token': loginUser?.token,
        },
      }
    );
    if (response?.data?.found === true) {
      setOrderData(response?.data?.data?.orderData[0]);
    } else {
      setOrderData({});
    }
  };
  useEffect(() => {
    getOrderDataApi();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {orderData === {} ? (
        <Text>No detal found 😣</Text>
      ) : (
        <>
          <View
            style={{
              backgroundColor: '#ffff',
              marginVertical: 10,
              marginHorizontal: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 24,
                  // fontWeight: 'bold',
                }}
              >
                ${Math.trunc(orderData?.amount)}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  color: 'black',
                }}
              >
                {' '}
                Standard
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  marginRight: 10,
                  fontWeight: '700',
                }}
              >
                <Ionicons name="ios-time-outline" size={18} color="gray" />{' '}
                {orderData?.delivery_time} Days Delivery
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  marginRight: 10,
                  fontWeight: '700',
                }}
              >
                <Entypo name="cycle" size={18} color="gray" /> 1 Revision
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#ffff',
              marginVertical: 10,
              marginHorizontal: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: 'gray', marginBottom: 10 }}>
              Buyer Information
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: 'gray',
                paddingBottom: 10,
              }}
            >
              <Image
                source={{
                  uri: `${baseUrlAssets}${orderData?.buyer_profile_photo}`,
                }}
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 50,
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  marginRight: 20,
                }}
              />

              <View style={{ display: 'flex' }}>
                <Text style={{ color: 'gray', fontSize: 20 }}>
                  {orderData?.buyer_username}
                </Text>
                <Text style={{ fontSize: 12, color: 'gray' }}>
                  {moment(orderData?.order_datetime).format('DD MMM YYYYY')}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <View style={styles.row}>
                <View>
                  <Text style={{ marginVertical: 20, marginRight: 8 }}>
                    Title:
                  </Text>
                  <Text style={{ marginVertical: 20, marginRight: 8 }}>
                    Duration:
                  </Text>
                  <Text style={{ marginVertical: 20, marginRight: 8 }}>
                    Ammount:
                  </Text>
                </View>
                <View>
                  <Text style={{ color: 'gray', marginVertical: 23 }}>
                    {orderData?.title}
                  </Text>
                  <Text style={{ color: 'gray', marginVertical: -4 }}>
                    {orderData?.delivery_time + ' '}
                    Days
                  </Text>
                  <Text style={{ color: 'gray', marginVertical: 45 }}>
                    ${orderData?.amount}
                  </Text>
                </View>
              </View>
              {/* <View style={styles.row}>
              </View> */}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  scene: {
    flex: 1,
  },
  cont: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#f0f0f0' },
  head: { height: 40, backgroundColor: '#f0f0f0' },
  text: { margin: 6 },
  row: {
    flexDirection: 'row',
    // justifyContent: 'sp',
    marginVertical: 8,
  },
});

export default SingleOrder;
