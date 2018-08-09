import React from "react";
import { Text } from 'react-native';
import { Button } from "native-base";


import styles from "./FabStyles.js";

export const Fab = ({ onPressAction, driverStatus }) => {
    return (
        <Button style={{...styles.fabContainer, backgroundColor: (driverStatus !== "notAvailable")? "#4ca64c" : "#FF5E3A"}} onPress={onPressAction}>
            <Text>
                <Text style={styles.btnText}>{(driverStatus == "notAvailable")? "Not \n Available" : "Available"}</Text>
            </Text>
        </Button>
    )
}

export default Fab;