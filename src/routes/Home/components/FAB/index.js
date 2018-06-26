import React from "react";
import { Text } from 'react-native';
import { Button } from "native-base";


import styles from "./FabStyles.js";

export const Fab = ({ onPressAction }) => {
    return (
        <Button style={styles.fabContainer} onPress={onPressAction}>
            <Text>
                <Text style={styles.btnText}>Available</Text>
            </Text>
        </Button>
    )
}

export default Fab;