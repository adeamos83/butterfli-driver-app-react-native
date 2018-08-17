import React from "react";
import { Text, Image } from 'react-native';
import { View, Button } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';



import styles from "./RideSummaryStyles";

export const RideSummary = ({ driverInfo, getDriverLocation}) => {
    const { profilePic } = driverInfo || "";
    const { vehicle } = driverInfo || {};
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
                        <Text style={styles.routeText}>31382 Wilshire Blvd, Los Angeles, CA 90010</Text>
                     </View>
                  </View>
                  <View style={styles.routeContainer}>
                     <View style={styles.iconContainer}>
                        <Icon name="map-marker" style={styles.locationIcon} />
                     </View>
                     <View style={{flexDirection: "column",  justifyContent: "center"}}>
                        <Text style={styles.routeHeader}>Drop Off</Text>
                        <Text style={styles.routeText}>865 South Figeroa, Los Angeles, CA 90010</Text>
                     </View>
                  </View>
                  <View style={styles.routeContainer}>
                     <View style={styles.iconContainer}>
                        <Icon name="road" style={styles.locationIcon} />
                     </View>
                     <View style={{flexDirection: "column",  justifyContent: "center"}}>
                        <Text style={styles.routeHeader}>2.4 Miles</Text>
                     </View>
                  </View>
               </View>
               <View style={styles.buttonContainer}>
                     <Button style={styles.navButton}>
                        <Text style={styles.btnText}>Ok</Text>
                     </Button>
               </View>

        </View>
    );
}

export default RideSummary;