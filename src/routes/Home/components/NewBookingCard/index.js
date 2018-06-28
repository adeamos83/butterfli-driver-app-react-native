import React from "react";
import { Text } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Button, View } from "native-base";


import styles from "./NewBookingCardStyles.js";

export const NewBookingCard = () => {
    return (
           <View style={styles.bookingContainer}>
                <CardItem>
                    <Body>
                        <Text>
                        You Have new Ride Request. Do you want to accept this ride request?
                        </Text>
                    </Body>
                </CardItem>
           </View>
                
            
    )
}

export default NewBookingCard;