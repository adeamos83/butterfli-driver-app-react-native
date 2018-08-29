import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './AlertStyles';

export const AlertContainer =({ removeAlert, alert }) => {

   onRemoveAlert = () => {
      removeAlert(alert.id);
   }

   return(
      <TouchableWithoutFeedback onPress={() => onRemoveAlert()}>
         <View style={styles.container}>
            <Text style={styles.text}>
               {alert.text}
            </Text>
         </View>
      </TouchableWithoutFeedback>
   )
}

export default AlertContainer;