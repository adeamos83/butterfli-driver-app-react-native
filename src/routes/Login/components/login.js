import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

//Component Imports
import LoginContainer from './Login';
import CreateProfile from './CreateProfile';

//Image Imports
const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");
const carMarker = require("../../../Assets/img/carMarker.png");

class Login extends React.Component {

   componentDidMount(){
   }

   componentDidUpdate(prevProps, prevState) {
      if(this.props.user_id  && !prevProps.user_id && !this.props.needsProfile){
         if(this.props.user_id){
            console.log("user is found");
            Actions.home({type: "replace"});
         }
      }
   }

   navToHomePage = () => {
      //Takes user to the HomePage route
      Actions.home({type: "replace"});
      console.log("Goto Homepage");
   }
   render() {
      return(
      <Container>
      { (this.props.needsProfile == false) &&
         <View style={{flex:1}}>
               <LoginContainer 
                  user_id={this.props.user_id}
                  authUser={this.props.authUser}
                  addAlert={this.props.addAlert}
                  loginUser={this.props.loginUser}
                  signupUser={this.props.signupUser}
                  needsToCreateProfile={this.props.needsToCreateProfile}
               />
         </View>
            ||
            (this.props.needsProfile == true) &&
               <CreateProfile 
                  user_id={this.props.user_id}
                  addAlert={this.props.addAlert}
                  signupUser={this.props.signupUser}
                  createProfile={this.props.createProfile}
               />
         }
         
      </Container>
      );
      
   }
}

export default Login;