import React from "react";
import { Text, Image } from 'react-native';
import { View, Button } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from "./RideSummaryStyles";

export const RideSummary = ({ driverInfo, newBookingAlerted, pickUpArrivingAlerted, dropOffArrivingAlerted, bookingDetails, bookingRequestCompleted, navToHomePage}) => {
    const { pickUp, dropOff, tripDistance} = bookingDetails || {};
    const { profilePic } = driverInfo || "";
    const { vehicle } = driverInfo || {};

    // This function navigates the user back to the app home screen
    rideSummaryNav = () => {
		navToHomePage();
		bookingRequestCompleted();
		newBookingAlerted(false);
        pickUpArrivingAlerted(false);
        dropOffArrivingAlerted(false);
    }

    return (
        <View style={styles.findDriverContainer}>
               <View style={styles.rideheader}>
                  <Text style={styles.riderHeaderText}>Trip Completed</Text>
               </View>
               <View style={{backgroundColor: "white"}}>
                  <Text style={styles.detailsHeader}>Trip Details</Text>
                  <View style={styles.routeContainer}>
                     <View style={styles.iconContainer}>
                        <Icon name="clock-o" style={styles.clockIcon} />
                     </View>
                     <View style={{flexDirection: "column",  justifyContent: "center"}}>
                        <Text style={styles.routeHeader}>Today at 1:30pm</Text>
                     </View>
                  </View>
                  <View style={styles.routeContainer}>
                     <View style={styles.iconContainer}>
                        <Icon name="map-marker" style={styles.locationIcon} />
                     </View>
                     <View style={{flexDirection: "column",  justifyContent: "center"}}>
                        <Text style={styles.routeHeader}>Pick Up</Text>
                        <Text style={styles.routeText}>{pickUp.address}</Text>
                     </View>
                  </View>
                  <View style={styles.routeContainer}>
                     <View style={styles.iconContainer}>
                        <Icon name="map-marker" style={styles.locationIcon} />
                     </View>
                     <View style={{flexDirection: "column",  justifyContent: "center"}}>
                        <Text style={styles.routeHeader}>Drop Off</Text>
                        <Text style={styles.routeText}>{dropOff.address}</Text>
                     </View>
                  </View>
                  <View style={styles.routeContainer}>
                     <View style={styles.iconContainer}>
                        <Icon name="road" style={styles.locationIcon} />
                     </View>
                     <View style={{flexDirection: "column",  justifyContent: "center"}}>
                        <Text style={styles.routeHeader}>{tripDistance[0].totalMiles + " miles"}</Text>
                     </View>
                  </View>
               </View>
               <View style={styles.buttonContainer}>
                     <Button style={styles.navButton} onPress={()=>this.rideSummaryNav()}>
                        <Text style={styles.btnText}>Ok</Text>
                     </Button>
               </View>

        </View>
    );
}

export default RideSummary;