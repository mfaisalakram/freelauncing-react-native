import React from 'react';
import { StyleSheet, View } from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome } from '@expo/vector-icons';

export function Starts ({value}){
return(
    <View style={{alignItems:'center'}}>
  <Stars
    default={value}
    count={5}
    half={true}
    starSize={50} 
    fullStar={<FontAwesome name="star" size={20} style={[styles.myStarStyle]}/>}
    emptyStar={<FontAwesome name='star-o' size={20} /> }
    halfStar={<FontAwesome name="star-half-full" size={20} style={[styles.myStarStyle]}/>}
  />
</View>
)
}
const styles = StyleSheet.create({
  myStarStyle: {
    color: 'black',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},

  },
  myEmptyStarStyle: {
    color: 'white',
  }
});