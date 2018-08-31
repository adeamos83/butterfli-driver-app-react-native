import React from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

//Component Imports
import LoginContainer from './Login';
import CreateProfile from './CreateProfile';

class Login extends React.Component {

   constructor(props){
         super(props);
      if(this.props.user_id && this.props.token){
            if(this.props.currentRoute){
                  console.log("Going to last active scene.")
                  Actions[this.props.currentRoute.slice(1)].call({type: 'replace'})
            } else {
                  Actions.home({type: "replace"});
            }
      }  
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