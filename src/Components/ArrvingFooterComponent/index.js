import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button, Container, Header } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './ArrvingFooterComponentStyles.js';


export const ArrivingFooter = ({ navToPickUp, bookingDetails, distanceFrom }) => {
    const { pickUp } = bookingDetails || {};
    const { duration } = distanceFrom.rows[0].elements[0] || "";

    return ( 
            <View>
               {
                  (duration.value < 300) &&
            
                  <View style={styles.headerContainer} iosBarStyle="light-content">
                     <View style={styles.innerContainer}>
                        <View style={styles.timeIconContainer}>
                              <Button transparent dark style={styles.iconButton} onPress={navToPickUp}>
                                 <Icon size={25} name="clock" style={{color: "black"}}/> 
                              </Button>
                        </View>
                        <View style={styles.arrivalTextContainer}>
                              <Text style={styles.arrivalText}>Arriving to Passenger pickup location in 3 minutes</Text>
                        </View>
                     </View>
                  </View>
               }
            </View>
    );
}

export default ArrivingFooter;