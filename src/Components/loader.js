import React from "react";
import { Text, Platform, Linking, StyleSheet } from 'react-native';
import { View, Button } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
var Spinner = require('react-native-spinkit');


export const LoaderComponent = () => {

    return (
        <View style={styles.newBookingContainer}>
            <Spinner style={styles.spinner} isVisible={true} size={125} type="Pulse" color="#ffffff" />
            <View style={styles.content}>
               <Text>Connecting and Loading</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   newBookingContainer:{
      flex:1,
      backgroundColor:"#E4F1FE",
      justifyContent: "center",
      alignItems: "center",
  },
});

export default LoaderComponent;