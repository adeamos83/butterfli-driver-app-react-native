import React from "react";
import { Text, Platform, Linking } from 'react-native';
import { View, Button } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

var Spinner = require('react-native-spinkit');

import styles from "./NewBookingStyles";

export const NewBooking = ({bookingDetails, acceptRideRequest, openMapsRoute, rejectBookingRequest, getDriverStatus, cancelBooking, updateBookingDetails }) => {
    const { dropOff, pickUp} = bookingDetails || {};

    updateTripDetails = () => {
        // updateBookingDetails("driverStatus", "available");
        getDriverStatus('enRoute');
        acceptRideRequest();
        // setTimeout(function(){
        //     updateBookingDetails("rideRequestStatus", "enRoute");
        // }, 7000)
    }
    rejectBooking = () => {
        // updateBookingDetails("rideRequestStatus", "rejected");
        rejectBookingRequest();
        Actions.home({type: "replace"});
    }

     openMaps = () => {
            const pickUpArr = {
                latitude:  pickUp.latitude,
                longitude: pickUp.longitude 
            };
        
            const dropOffArr = {
                latitude:  dropOff.latitude,
                longitude: dropOff.longitude
            };

            buildLngLat = (position) => {
                return `${position.latitude},${position.longitude}`
            };
            
            const origin = this.buildLngLat(pickUpArr);
            const destination = this.buildLngLat(dropOffArr);

            buildMapBoxUrl = (origin, destination) => {
                return `http://maps.apple.com/?saddr=${origin}&daddr=${destination}&dirflg=d`
            } 

            const url = this.buildMapBoxUrl(origin, destination);
            console.log(url);
            console.log('open directions') 
            if (Platform.OS === "ios") { 
                Linking.openURL(url) 
            } else { 
                Linking.openURL('http://maps.google.com/maps?daddr='); 
            } 
    }

    

    return (
        <View style={styles.newBookingContainer}>
            <Spinner style={styles.spinner} isVisible={true} size={125} type="Pulse" color="#ffffff" />
            <View style={styles.content}>
                <Text style={styles.text}>You have a new Ride Request</Text>
                <Icon style={styles.locationIcon} name="map-marker"/>
                <View style={styles.pickup}>
                    <Text>{ pickUp.name }</Text>
                </View>

                <Icon style={styles.locationIcon} name="long-arrow-down"/>
                <View style={styles.dropoff}>
                    <Text>{ dropOff.name }</Text>
                </View>
                <View style={styles.buttonView}>
                    <Button  style={styles.acceptBtn} onPress={() => updateTripDetails()}>
                        <Text style={styles.accpetBtnText}>Accept</Text>
                    </Button>
                    <Button  style={styles.cancelBtn} onPress={() => rejectBooking()}>
                        <Text style={styles.cancelBtnText}>Decline</Text>
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default NewBooking;