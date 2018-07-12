import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button, Container, Header } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './NavHeaderComponentStyles';


export const NavHeaderComponent = ({ navToPickUp, bookingDetails }) => {
    const { pickUp } = bookingDetails || {};

    return (
        
            <View style={styles.headerContainer} iosBarStyle="light-content">
                <View style={styles.innerContainer}>
                    <View style={styles.navIconContainer}>
                        <Button transparent dark style={styles.iconButton} onPress={navToPickUp}>
                            <Icon size={25} name="location-arrow" style={{color: "black"}}/> 
                            <Text style={styles.navText}>NAVIGATE</Text>
                        </Button>
                    </View>
                    <View style={styles.navTextContainer}>
                        <Text style={styles.navText}>{ pickUp.address }</Text>
                    </View>
                </View>
            </View>
    
    );
}

export default NavHeaderComponent;