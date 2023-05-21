import React, { useState, useEffect } from 'react';
import { Image, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import SingerBuyerGig from '../SingerBuyerGig/SingerBuyerGig';
import gig1 from '../../../assets/images/Gigs/gig1.png';
import gig3 from '../../../assets/images/Gigs/gig3.jpg';
import axios from 'axios';
import { getLoginUserSelector } from '../../store/sellerMode/selector';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { baseUrl } from '../../shared/baseUrl';
import Spinner from '../Spinner/Spinner';

const BuyerGigsList = () => {
  const [buyerGgigss, setbuyerGgigss] = useState([]);
  const [serviceLoading, setserviceLoading] = useState(true);

  const loginUser = useSelector(getLoginUserSelector);
  const route = useRoute();

  const getAllGigs = async () => {
    const searchText = '';
    const response = await axios.get(
      `${baseUrl}api/service/search${searchText}`,
      {
        headers: {
          'x-auth-token': loginUser?.token,
        },
      }
    );
    setserviceLoading(false);
    setbuyerGgigss(response.data.data.services);
  };

  useEffect(() => {
    getAllGigs();
  }, []);

  return (
    <View style={styles().conatiner}>
      {serviceLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Spinner />
        </View>
      ) : (
        <>
          {buyerGgigss.map((item, index) => (
            <SingerBuyerGig
              key={index}
              img={item.images.split('@')[0]}
              profileImage={item.profile_image}
              title={item.title}
              raiting={item.raiting}
              price={item.price}
              username={item.username}
              usernameClick={item.username}
              titleClick={item?.url_title}
            />
          ))}
        </>
      )}
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    conatiner: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 10,
    },
  });

export default BuyerGigsList;
