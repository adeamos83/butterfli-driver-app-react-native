import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, View, TextInput, Image, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './CreateProfileStyles';
import TextField from '../TextField/TextField';
import { TextInputField } from '../../../../Components/Common';
import CreateVehicleProfile from '../VehicleProfile';
import Icon from 'react-native-vector-icons/FontAwesome';


export const CreateProfile =({addAlert, user_id, createProfile, createUserProfile, createCarProfile,
   gotoCarProfile, navToCarPage, isSigningUp, newUserProfile, signingUp,handleSubmit, fields: {firstName, lastName, email, companyCode, phoneNumber}}) => {
   
   onCreateProfile = (values) => {
   createUserProfile(values)
    gotoCarProfile(true);
   }

   onSignUp = (values) => {
    signupUser(values.email, values.password)      
   }

   return (
      <KeyboardAvoidingView behavior="padding"  keyboardVerticalOffset={Platform.select({ios: 0, android: 25})} style={styles.container}>
      { (true) && 
         <ScrollView>
            <View style={styles.titleContainer}>
               <Image style={styles.logo} source={require('../../../../Assets/img/ButterFLi-logo-header.png')}/>
            </View>
            <View style={styles.field}>
               <Field
                  {...firstName}
                  withRef
                  refField='firstName'
                  ref={(c) => this.firstName = c}
                  name="firstName"
                  component={TextInputField}
                  placeholder="First Name"
                  validate={this.renderError}
                  returnKeyType="next"
                  onEnter={() => { 
                     this.lastName.getRenderedComponent().refs.lastName.focus()
                  }}
               />
            </View>
            <View style={styles.field}>
               <Field
                  {...lastName}
                  withRef
                  refField='lastName'
                  ref={(c) => this.lastName = c}
                  name="lastName"
                  component={TextInputField}
                  placeholder="Last Name"
                  validate={this.renderError}
                  returnKeyType="next"
                  onEnter={() => { 
                     this.email.getRenderedComponent().refs.email.focus()
                  }}
               />
            </View>
            <View style={styles.field}>
               <Field
                  {...email}
                  withRef
                  refField='email'
                  ref={(c) => this.email = c}
                  name="email"
                  component={TextInputField}
                  placeholder="Email"
                  validate={this.renderError}
                  returnKeyType="next"
                  onEnter={() => { 
                     this.phoneNumber.getRenderedComponent().refs.phoneNumber.focus()
                  }}
               />
            </View>
            <View style={styles.field}>
               <Field
                  {...phoneNumber}
                  withRef
                  refField='phoneNumber'
                  ref={(c) => this.phoneNumber = c}
                  name="phonenumber"
                  component={TextInputField}
                  placeholder="Phone Number"
                  validate={this.renderError}
                  returnKeyType="next"
                  onEnter={() => { 
                     this.companyCode.getRenderedComponent().refs.companyCode.focus()
                  }}
               />
            </View>
            <View style={styles.field}>
               <Field
                  {...companyCode}
                  withRef
                  refField='companyCode'
                  ref={(c) => this.companyCode = c}
                  name="companyCode"
                  component={TextInputField}
                  placeholder="Company Code"
                  validate={this.renderError}
                  returnKeyType="next"
               />
            </View>
            <View style={styles.buttonView}>
               <Button style={styles.signinBtn} onPress={handleSubmit(this.onCreateProfile)}>
                  <Text style={styles.btnText}>Next</Text>
                
                     <Icon size={25} name="long-arrow-right" style={{color: "white", justifyContent: 'flex-end', paddingRight: 10}}/> 
                
                  
               </Button>
               {/* 
                  <Button  style={styles.signup}>
                     <Text style={styles.btnText}>Cancel</Text>
                  </Button>
               */}
            </View>
            </ScrollView>
            ||
            <CreateVehicleProfile 
               createCarProfile={createCarProfile}
               createProfile={createProfile}
               createUserProfile={createUserProfile}
               isSigningUp={isSigningUp}
               signingUp={signingUp}
               newUserProfile={newUserProfile}
            />
         }
      </KeyboardAvoidingView>
   )
}


var validate = (formProps) => {
   var errors = {};
   if(!formProps.firstName){
      errors.firstName = "Please enter an first name."
   }
   if(!formProps.lastName){
      errors.lastName = "Please enter a last name."
   }
   if(!formProps.phonenumber){
      errors.phonenumber = "Please enter a phone number."
   }
   return errors;
}

module.exports = reduxForm({
   form: 'createProfile',
   fields: ['firstName', 'lastName', 'email', 'phoneNumber', 'companyCode'],
   validate: validate
}, null, null)(CreateProfile);