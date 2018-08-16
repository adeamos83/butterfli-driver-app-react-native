import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, View, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './LoginStyles';
import TextField from '../TextField/TextField';
import PassTextField from '../TextField/PassTextField'
import { TextInputField } from '../../../../Components/Common/'

export const LoginContainer =({addAlert, 
										authUser, 
										user_id, 
										needsToCreateProfile, 
										loginUser, 
										signupUser, 
										handleSubmit, 
                              getInputData,
                              inputData,
										fields: {email, password}}) => {
  // const {handleSubmit, fields: {email, password}} = this.props;

   onSignIn = (values) => {
    // console.log('submitting form', values)
    // console.log(values)
    // console.log(values.email, values.password);
    // addAlert('hello');
    // addAlert('Testing 123');
    // authUser('fakeid');
    loginUser(values.email, values.password)
    // var {email, password} = this.props.fields;
      
   }

   onSignUp = (values) => {
    needsToCreateProfile(true);  
    signupUser(values.email, values.password);  
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
               name="email"
               component={TextField}
               placeholder="Email"
               placeholderTextColor="rgba(255,255,255,0.7)"
               returnKeyType="next"
               keyboardType="email-address"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...password}
               name="password"
               component={PassTextField}
               placeholder="Password"
               placeholderTextColor="rgba(255,255,255,0.7)"
               returnKeyType="go"
               secureTextEntry
            />
         </View>
         {/* Native Input Field 
            <View style={styles.field}>
             <TextInputField getInputData={getInputData} inputData={inputData}/>
            </View> 
         */}
         <View style={styles.buttonView}>
            <Button info style={styles.signinBtn} onPress={handleSubmit(this.onSignIn)}>
               <Text style={styles.btnText}>Sign In</Text>
            </Button>
            <Button  style={styles.signup} onPress={handleSubmit(this.onSignUp)}>
               <Text style={styles.btnText}>Sign Up</Text>
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