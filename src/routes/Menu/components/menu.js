import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

//Component Imports
import MenuContainer from './Menu'

//Image Imports
const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");
const carMarker = require("../../../Assets/img/carMarker.png");

class Menu extends React.Component {

   navToHomePage = () => {
      //Takes user to the HomePage route
      Actions.home({type: "replace"});
      console.log("Goto Homepage");
   }
   render() {
      return(
      <Container>
         <View style={{flex:1}}>
            <MenuContainer 
               user_id={this.props.user_id}
               authUser={this.props.authUser}
               unAuthUser={this.props.unAuthUser}
               driverInfo={this.props.driverInfo}
               currentRoute={this.props.currentRoute}
               prevRoute={this.props.prevRoute}
               driverStatus={this.props.driverStatus}
               cancelBookingRequest={this.props.cancelBookingRequest}
               getDriverStatus={this.props.getDriverStatus}
            />
         </View>
      </Container>
      );
      
   }
}

export default Menu;