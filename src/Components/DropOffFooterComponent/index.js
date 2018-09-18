import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './DropOffFooterComponentStyles';


export const DropOffFooterComponent = ({ dropOffDistance, distanceFrom, getDriverStatus, navToHomePage, updateBookingDetails }) => {

    const { duration, distance } = distanceFrom.rows[0].elements[0] || "";
    dropOffConfrim = () => {
        getDriverStatus('available');
        // navToHomePage();
        updateBookingDetails("rideRequestStatus", "completed")
    }
    return (
        <View>
            { (dropOffDistance < 480) &&
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