import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button, Container, Header } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './NavHeaderComponentStyles';


export const NavHeaderComponent = ({ navToPickUp, bookingDetails, driverStatus }) => {
    const { pickUp, dropOff } = bookingDetails || {};

    return (
        
            <View style={styles.headerContainer} iosBarStyle="light-content">
                <View style={styles.innerContainer}>
                    <View style={styles.navIconContainer}>
                        <Button transparent dark style={styles.iconButton} onPress={navToPickUp}>
                            <Icon size={25} name="map-o" style={{color: "#9E9E9E"}}/> 
                            <Text style={styles.navText}>NAVIGATE</Text>
                        </Button>
                    </View>
                    <View style={styles.navTextContainer}>
                        <Text style={styles.navText}>{ (driverStatus == "pickUp") ? pickUp.address : dropOff.address }</Text>
                    </View>
                </View>
            </View>
    
    );
}

export default NavHeaderComponent;