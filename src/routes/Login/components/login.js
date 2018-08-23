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
		console.log(Actions.currentScene);  
   }

//    componentDidUpdate(prevProps, prevState) {
//       // if(this.props.user_id  && !prevProps.user_id && !this.props.needsProfile && this.props.loggingIn){
//       //    if(this.props.user_id){
//       //       console.log("user is found");
//       //       Actions.home({type: "replace"});
//       //    }
//       // }
//    }

   navToHomePage = () => {
      //Takes user to the HomePage route
      Actions.home({type: "replace"});
      console.log("Goto Homepage");
   }
   render() {
      return(
      <Container>
      { (this.props.needsProfile == false || !this.props.user_id) &&
         <View style={{flex:1}}>
               <LoginContainer 
                  user_id={this.props.user_id}
                  authUser={this.props.authUser}
                  addAlert={this.props.addAlert}
                  loginUser={this.props.loginUser}
                  signupUser={this.props.signupUser}
                  needsToCreateProfile={this.props.needsToCreateProfile}
                  getInputData={this.props.getInputData}
                  inputData={this.props.inputData}
                  isLoggingIn={this.props.isLoggingIn}
                  loggingIn={this.props.loggingIn}
                  isSigningUp={this.props.isSigningUp}
                  signingUp={this.props.signingUp}
               />
         </View>
            ||
            (this.props.needsProfile == true && this.props.user_id ) &&
               <CreateProfile 
                  user_id={this.props.user_id}
                  addAlert={this.props.addAlert}
                  signupUser={this.props.signupUser}
                  createProfile={this.props.createProfile}
                  createCarProfile={this.props.createCarProfile}
                  gotoCarProfile={this.props.gotoCarProfile}
                  navToCarPage={this.props.navToCarPage}
                  createUserProfile={this.props.createUserProfile}
                  isSigningUp={this.props.isSigningUp}
                  signingUp={this.props.signingUp}
                  newUserProfile={this.props.newUserProfile}
               />
         }
         
      </Container>
      );
      
   }
}

export default Login;