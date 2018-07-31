import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, View, TextInput } from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './LoginStyles';
import TextField from '../TextField/TextField';


export const LoginContainer =({addAlert, authUser, user_id, handleSubmit, fields: {email, password}}) => {
  // const {handleSubmit, fields: {email, password}} = this.props;

   onSignIn = (values) => {
    // console.log('submitting form', values)
    // console.log(values)
    // console.log(values.email, values.password);
    addAlert('hello');
    addAlert('Testing 123');
    authUser('fakeid');
    // var {email, password} = this.props.fields;
      
   }

   return (
      <View style={styles.container}>
         <View style={styles.titleContainer}>
            <Text style={styles.title}> ButterFLi </Text>
         </View>
         <View style={styles.field}>
            <Field
               {...email}
               name="email"
               component={TextField}
               placeholder="Email"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...password}
               name="password"
               component={TextField}
               placeholder="Password"
            />
         </View>
         <View style={styles.buttonView}>
            <Button info style={styles.signinBtn} onPress={handleSubmit(this.onSignIn)}>
               <Text style={styles.btnText}>Sign In</Text>
            </Button>
            <Button  style={styles.signup}>
               <Text style={styles.btnText}>Sign Up</Text>
            </Button>
         </View>
      </View>
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