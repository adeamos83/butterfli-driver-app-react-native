import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

//Component Imports
import ProfileContainer from './Profile'

//Image Imports
const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");

class Profile extends React.Component {

   componentDidMount(){
      this.props.getCurrentRoute();
   }

   render() {
      return(
      <Container>
         <View style={{flex:1}}>
            <ProfileContainer 
               driverInfo={this.props.driverInfo}
               changeVehcileType={this.props.changeVehcileType}
               updatedDriverInfo={this.props.updatedDriverInfo}
            />
         </View>
      </Container>
      );
      
   }
}

export default Profile;