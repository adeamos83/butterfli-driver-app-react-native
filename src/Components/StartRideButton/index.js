import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './StartRideButtonStyles';


export const StartRideButton = ({ startTrip }) => {
    
    return (
        <View>
            <View style={styles.footerContainer}>
               
                  <View style={styles.buttonContainer}>
                        <Button  style={styles.navButton} onPress={startTrip}>
                           <Text style={styles.btnText}>{"Start Trip"}</Text>
                        </Button>
                  </View>
               
            </View>
         </View>
    );
}

export default StartRideButton;