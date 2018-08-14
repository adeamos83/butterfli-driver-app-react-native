import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button, Container, Header } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './ArrvingFooterComponentStyles.js';


export const ArrivingFooter = ({ navToPickUp, bookingDetails, distanceFrom }) => {
      const { rideRequestStatus } = bookingDetails || {};
      const { duration } = distanceFrom.rows[0].elements[0] || "";
      const alertArrival = true; 
    return ( 
            <View>
               {
                  (duration.value > 150 && duration.value < 300) &&
            
                  <View style={styles.headerContainer} iosBarStyle="light-content">
                     <View style={styles.innerContainer}>
                        <View style={styles.timeIconContainer}>
                              <Button transparent dark style={styles.iconButton} onPress={navToPickUp}>
                                 <Icon size={25} name="clock" style={{color: "black"}}/> 
                              </Button>
                        </View>
                        <View style={styles.arrivalTextContainer}>
                              <Text style={styles.arrivalText}>
                                    {(rideRequestStatus == "arriving") ? "Arriving to passenger's pickup location in " +  duration.text :  "Arriving to passenger's drop off location in " +  duration.text }
                              </Text>
                        </View>
                     </View>
                  </View>
               }
            </View>
    );
}

export default ArrivingFooter;