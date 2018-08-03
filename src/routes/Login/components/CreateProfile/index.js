import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, View, TextInput } from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './CreateProfileStyles';
import TextField from '../TextField/TextField';


export const CreateProfile =({addAlert, user_id, createProfile,
   handleSubmit, fields: {firstname, lastname, dob, make, model, year, license, color}}) => {
  // const {handleSubmit, fields: {email, password}} = this.props;

   onCreateProfile = (values) => {
    // console.log('submitting form', values)
    console.log(values)
    // console.log(values.email, values.password);
    // addAlert('hello');
    // addAlert('Testing 123');
    // authUser('fakeid');
    createProfile(values);
    // var {email, password} = this.props.fields;
      
   }

   onSignUp = (values) => {
    signupUser(values.email, values.password)      
   }

   return (
      <View style={styles.container}>
         <View style={styles.titleContainer}>
            <Text style={styles.title}> ButterFLi </Text>
         </View>
         <View style={styles.field}>
            <Field
               {...firstname}
               name="firstName"
               component={TextField}
               placeholder="first Name"
               validate={this.renderError}
            />
            
         </View>
         <View style={styles.field}>
            <Field
               {...lastname}
               name="lastName"
               component={TextField}
               placeholder="Last Name"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...dob}
               name="dob"
               component={TextField}
               placeholder="Date of Birth"
            />
         </View>
         <View style={styles.field}>
            <Field
               {...make}
               name="make"
               component={TextField}
               placeholder="Vehicle Make"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...model}
               name="model"
               component={TextField}
               placeholder="Car Model"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...year}
               name="year"
               component={TextField}
               placeholder="Year"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...license}
               name="license"
               component={TextField}
               placeholder="License Plate"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
         <Field
            {...color}
            name="color"
            component={TextField}
            placeholder="Color of Vehicle"
            validate={this.renderError}
         />
      </View>
         <View style={styles.buttonView}>
            <Button info style={styles.signinBtn} onPress={handleSubmit(this.onCreateProfile)}>
               <Text style={styles.btnText}>Submit</Text>
            </Button>
            <Button  style={styles.signup}>
               <Text style={styles.btnText}>Cancel</Text>
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
   form: 'createProfile',
   fields: ['firstname', 'lastname', 'dob', 'make', 'model', 'year', 'license', 'color'],
   validate: validate
}, null, null)(CreateProfile);