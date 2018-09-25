import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button, Container, Header } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './NavHeaderComponentStyles';


export const NavHeaderComponent = ({ navToPickUp, bookingDetails, currentRoute, driverStatus }) => {
    const { pickUp, dropOff } = bookingDetails || {};

    return (
        
            <View style={styles.headerContainer} iosBarStyle="light-content">
                <View style={styles.innerContainer}>
                    <View style={styles.navIconContainer}>
                        <Button transparent dark style={styles.iconButton} onPress={navToPickUp}>
                            <Icon size={20} name="navigation" style={{color: "white"}}/> 
                            <Text style={styles.navText}>Navigate</Text>
                        </Button>
                    </View>
                    <View style={styles.navTextContainer}>
                        { (currentRoute == "_rideRequest") && 
                            <Text adjustsFontSizeToFit={true} style={styles.navTextOverview}>Trip Overview</Text>
                            ||
                            (pickUp) && 
                            <Text adjustsFontSizeToFit={true} style={styles.navText}>{ (driverStatus == "pickUp") ? "Pick up at " + pickUp.address.split(/,(.+)/)[0] : "Drop off at " + dropOff.address.split(/,(.+)/)[0] }</Text>
                        }
                    </View>
                </View>
            </View>
    
    );
}

export default NavHeaderComponent;