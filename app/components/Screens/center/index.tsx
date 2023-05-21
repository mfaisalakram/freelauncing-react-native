import React, { useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Header from "../../Header";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
// import pin from '../../../../assets/images/custom_pin.png'
export function Center() {


  return (
    <View style={styles().container}>
      <MapView
        initialRegion={{
          latitude: 31.461558,
          longitude: 74.455072,
          latitudeDelta: 0.0082,
          longitudeDelta: 0.0081,
        }}
        zoomEnabled={true}
        style={styles().map}
      >
        <Marker
          coordinate={{ latitude: 31.461556, longitude: 74.455083 }}
          title="Police Station Defence c"
        />
        <Marker
          coordinate={{ latitude: 31.49916667, longitude: 74.39472222 }}
          title="Police Station Defence c"
        />
      </MapView>
    </View>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    //   marginTop: "50%",
    },
    aboutHeading: {
      color: "white",
      fontSize: 18,
      textAlign: "center",
      fontWeight: "bold",
      position: "absolute",
    },
  });
