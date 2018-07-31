import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

//Component Imports
import LoginContainer from './Login'

//Image Imports
const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");
const carMarker = require("../../../Assets/img/carMarker.png");

class Login extends React.Component {

   componentDidMount(){
      console.log(this.props);
   }

   componentDidUpdate(prevProps, prevState) {
      if(this.props.user_id  && !prevProps.user_id){
         if(this.props.user_id){
            console.log("user is found");
            Actions.home({type: "replace"});
         }
      }
      console.log(this.props)
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
            <LoginContainer 
               user_id={this.props.user_id}
               authUser={this.props.authUser}
               addAlert={this.props.addAlert}
            />
         </View>
      </Container>
      );
      
   }
}

export default Login;