import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

//Component Imports
import AlertContainer from './Alert'

//Image Imports
const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");
const carMarker = require("../../../Assets/img/carMarker.png");

class Alert extends React.Component {

   componentDidMount(){
   }

   componentDidUpdate(prevProps, prevState) {
      console.log(this.props.alerts);
   }

   renderAlert = () => {
      // return this.props.alerts.map((alert) => {
      //    return(
      //       <AlertContainer alert={alert} key={alert.id}/>
      //    );
      // })
      console.log(this.props);
   } 

   render() {
      // var renderAlert = () => {
      //    // return this.props.alerts.map((alert) => {
      //    //    return(
      //    //       <AlertContainer alert={alert} key={alert.id}/>
      //    //    );
      //    // })
      //    console.log(this.props);
      // } 
      return(
         <View style={{flex:1, position: "absolute", bottom: 0, left: 0, right: 0}}>
            {this.renderAlert()}
         </View>
      );
      
   }
}

export default Alert;