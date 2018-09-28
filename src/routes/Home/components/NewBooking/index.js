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
        getDriverStatus('enRoute');
        acceptRideRequest();
    }
    rejectBooking = () => {
        rejectBookingRequest();
        Actions.home({type: "replace"});
    }
    
    return (
        <View style={styles.newBookingContainer}>
                {/* 
                    <Spinner style={styles.spinner} isVisible={true} size={125} type="Pulse" color="#ffffff" />
                */}            
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