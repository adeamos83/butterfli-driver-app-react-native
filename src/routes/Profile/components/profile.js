import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

//Component Imports
import ProfileContainer from './Profile'

//Image Imports
const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");

class Profile extends React.Component {


   render() {
      return(
      <Container>
         <View style={{flex:1}}>
            <ProfileContainer 
               driverInfo={this.props.driverInfo}
            />
         </View>
      </Container>
      );
      
   }
}

export default Profile;