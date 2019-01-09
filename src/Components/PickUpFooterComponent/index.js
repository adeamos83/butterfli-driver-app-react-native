import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './PickUpFooterComponentStyles';
import { getLatLonDiffInMeters } from '../../util/helper';

export const PickUpFooterComponent = ({ bookingDetails, pickUpDistance, distanceFrom, getDriverStatus, pickUpPassenger, updateBookingDetails }) => {
    const { firstName } = bookingDetails || "";
    // const { duration, distance } = distanceFrom.rows[0].elements[0] || "";
    pickUpConfrim = () => {
        getDriverStatus('dropOff');
        pickUpPassenger();
        updateBookingDetails("rideRequestStatus", "arrived");
    }
    return (
        <View>
            { (pickUpDistance < 300) &&
                <View style={styles.footerContainer}>
                        <View style={styles.buttonContainer}>
                            <Button success style={styles.navButton} onPress={()=>this.pickUpConfrim()}>
                                <Text style={styles.btnText}>{"Pick Up " + firstName}</Text>
                            </Button>
                        </View>
                </View>
            }
         </View>
    );
}

export default PickUpFooterComponent;