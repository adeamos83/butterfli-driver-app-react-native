import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button, Container, Header } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './UserFooterComponentStyles';


export const UserFooterComponent = ({ navToPickUp, bookingDetails }) => {
    const { pickUp } = bookingDetails || {};

    return (
        
            <View style={styles.footerContainer} iosBarStyle="light-content">
                <View style={styles.innerContainer}>
                    <Icon size={25} name="human-greeting" style={{color: "black", paddingRight: 10}}/> 
                    <View style={styles.navIconContainer}>
                        <Text style={styles.routeText}>Pick Up</Text>
                        <Text style={styles.navText}>Joe</Text>
                    </View>
                    <View style={styles.navTextContainer}>
                        <Text style={styles.navText}> Pick Up</Text>
                    </View>
                </View>
            </View>
    
    );
}

export default UserFooterComponent;