import React, { Component } from 'react';
import update from 'react-addons-update';
import { Field, reduxForm } from 'redux-form';
import { Text, View, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './LoginStyles';
import TextField from '../TextField/TextField';
import PassTextField from '../TextField/PassTextField'
import { TextInputField } from '../../../../Components/Common/'
import { Spinner, LoginTextInputField } from '../../../../Components/Common';

export const LoginContainer =({addAlert, 
										authUser, 
										user_id, 
										needsToCreateProfile, 
										loginUser, 
										signupUser, 
										handleSubmit, 
                    getInputData,
                    inputData,
                    loggingIn,
                    isLoggingIn,
                    isSigningUp,
                    signingUp,
										fields: {email, password}}) => {

	var loginInProcess = false;

   onSignIn = (values) => {
		if(!loginInProcess){
			loginInProcess = true;
			isLoggingIn(true);
      loginUser(values.email, values.password)
      // setTimeout(function(){
      //   isLoggingIn(false);
      // }, 30000) 
		} else {
			addAlert("Trying to logging into your account");
		}
   }

   onSignUp = (values) => {
      // isSigningUp(true) 
      // // signupUser(values.email, values.password); 
      // needsToCreateProfile(true);
      // Actions.createProfile({type: "replace"})
      Actions.register({type: "replace"})
   }

   return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
         <View style={styles.titleContainer}>
            <Image style={styles.logo} source={require('../../../../Assets/img/butterfli_name_logo.png')}/>
            <Text style={styles.subTitle}>Freedom Leading To Independence</Text>
         </View>
         <View style={styles.field}>
            <Field
               {...email}
               withRef
					refField='email'
					ref={(c) => this.email = c}
               name="email"
               component={LoginTextInputField}
               placeholder="Email"
               placeholderTextColor="rgba(255,255,255,0.7)"
               returnKeyType="next"
               keyboardType="email-address"
					validate={this.renderError}
					onEnter={() => { 
						this.password.getRenderedComponent().refs.password.focus()
					}}
            />
         </View>
         <View style={styles.field}>
            <Field
					{...password}
					withRef
					refField='password'
					ref={(c) => this.password = c}
               name="password"
               component={LoginTextInputField}
               placeholder="Password"
               placeholderTextColor="rgba(255,255,255,0.7)"
               returnKeyType="go"
               secureTextEntry
               onEnter={handleSubmit(this.onSignIn)}
            />
         </View>
         {/* Native Input Field 
            <View style={styles.field}>
             <TextInputField getInputData={getInputData} inputData={inputData}/>
            </View> 
         */}
         <View style={styles.buttonView}>
            <Button info style={loggingIn ? styles.signinBtnClicked : styles.signinBtn} onPress={handleSubmit(this.onSignIn)}>
            { loggingIn &&
               <Spinner size="small"/>
               ||   
               <Text style={styles.btnText}>Sign In</Text>
            }
            </Button>
            <Text style={{color: 'white', textAlign: 'center', paddingVertical: 5}} onPress={() => Actions.passwordReset({type: "replace"})}>Forgot Password</Text>
            <Button  style={styles.signup} onPress={this.onSignUp}>
            { signingUp &&
               <Spinner size="small"/>
               ||
               <Text style={styles.btnText}>Sign Up</Text>
            }   
            </Button>
         </View>
      </KeyboardAvoidingView>
   )
}


var validate = (formProps) => {
   var errors = {};
   if(!formProps.email){
      errors.email = "Please enter an email."
   }
   if(!formProps.password){
      errors.password = "Please enter a password."
   }
   return errors;
}

module.exports = reduxForm({
   form: 'login',
   fields: ['email', 'password'],
   validate: validate
}, null, null)(LoginContainer);