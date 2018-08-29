import React from 'react';
import { View } from 'react-native';

//Component Imports
import AlertContainer from './Alert'

class Alert extends React.Component {

   renderAlert = () => {
      return this.props.alerts.map((alert) => {
         return(
            <AlertContainer alert={alert} removeAlert={this.props.removeAlert} key={alert.id}/>
         );
      })
   } 

   render() {
      return(
         <View style={{flex:1, position: "absolute", bottom: 0, left: 0, right: 0}}>
            {this.renderAlert()}
         </View>
      );
      
   }
}

export default Alert;