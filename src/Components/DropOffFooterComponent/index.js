import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './DropOffFooterComponentStyles';


export const DropOffFooterComponent = ({ distanceFrom, getDriverStatus, navToHomePage, updateBookingDetails }) => {

    const { duration } = distanceFrom.rows[0].elements[0] || "";
    dropOffConfrim = () => {
        getDriverStatus('RideComplete');
        navToHomePage();
        updateBookingDetails("rideRequestStatus", "completed")
    }
    return (
        <View>
            { (duration.value < 120) &&
                <View style={styles.footerContainer}>
                    return (
                        <View style={styles.buttonContainer}>
                            <Button danger style={styles.navButton} onPress={()=>this.dropOffConfrim()}>
                                <Text style={styles.btnText}>End Ride</Text>
                            </Button>
                        </View>
                    )
                </View>
            }
         </View>
    );
}

export default DropOffFooterComponent;