import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button, Container, Header } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './UserFooterComponentStyles';


export const UserFooterComponent = ({ navToPickUp, bookingDetails, distanceFrom }) => {
    const { firstName, lastName } = bookingDetails || "";
    const { duration } = distanceFrom.rows[0].elements[0] || "";

    return (
        
            <View style={styles.footerContainer} iosBarStyle="light-content">
                <View style={styles.innerContainer}>
                    <Icon size={25} name="human-greeting" style={{color: "black", paddingRight: 10}}/> 
                    <View style={styles.navIconContainer}>
                        <Text style={styles.routeText}>Pick Up</Text>
                        <Text style={styles.nameText}>{ firstName }</Text>
                    </View>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>{ duration.text }</Text>
                    </View>
                </View>
            </View>
    
    );
}

export default UserFooterComponent;