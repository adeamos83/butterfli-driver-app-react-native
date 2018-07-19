import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './PickUpFooterComponentStyles';


export const PickUpFooterComponent = ({ distanceFrom, getDriverStatus, pickUpPassenger }) => {

    const { duration } = distanceFrom.rows[0].elements[0] || "";
    pickUpConfrim = () => {
        getDriverStatus('DropOff');
        pickUpPassenger();
    }
    return (
        <View>
            { (duration.value < 120) &&
                <View style={styles.footerContainer}>
                    return (
                        <View style={styles.buttonContainer}>
                            <Button success style={styles.navButton} onPress={()=>this.pickUpConfrim()}>
                                <Text style={styles.btnText}>Pick Up Ade</Text>
                            </Button>
                        </View>
                    )
                </View>
            }
         </View>
    );
}

export default PickUpFooterComponent;