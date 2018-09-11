import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

//Component Imports
import MenuContainer from './Menu'


class Menu extends React.Component {
   componentDidMount(){
      this.props.getDriverInfo();
   }

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
               newBookingAlerted={this.props.newBookingAlerted}
               pickUpArrivingAlerted={this.props.pickUpArrivingAlerted}
               dropOffArrivingAlerted={this.props.dropOffArrivingAlerted}
            />
         </View>
      </Container>
      );
      
   }
}

export default Menu;