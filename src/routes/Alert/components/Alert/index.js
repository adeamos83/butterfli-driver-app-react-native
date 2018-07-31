import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './AlertStyles';

export const AlertContainer =({ removeAlert, alerts }) => {

   onRemoveAlert = () => {
      removeAlert(alert.id);
   }

   return(
      <TouchableWithoutFeedback onPress={this.onRemoveAlert}>
         <View style={styles.container}>
            <Text style={styles.text}>
               {alerts.text}
            </Text>
         </View>
      </TouchableWithoutFeedback>
   )
}

export default AlertContainer;