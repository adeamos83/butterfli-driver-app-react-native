import React from "react";
import { Text } from 'react-native';
import { Button } from "native-base";
import { Spinner } from '../../../../Components/Common';


import styles from "./FabStyles.js";

export const Fab = ({ onPressAction, driverStatus, driverConnecting }) => {
    return (
        <Button style={{...styles.fabContainer, backgroundColor: (driverStatus !== "notAvailable")? "#26A65B" : "#EF4836"}} onPress={onPressAction}>
            { driverConnecting &&
                <Spinner size="small"/>
                || 
                <Text>
                    <Text style={styles.btnText}>{(driverStatus == "notAvailable")? "Not \n Available" : "Available"}</Text>
                </Text>
            } 
        </Button>
    )
}

export default Fab;