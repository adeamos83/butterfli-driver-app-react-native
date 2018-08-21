import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, View, TextInput, Image, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './VehicleProfileStyles';
import TextField from '../TextField/TextField';
import { Spinner, TextInputField } from '../../../../Components/Common';


export const CreateVehicleProfile =({addAlert, user_id, createUserProfile, createProfile, createCarProfile, 
   isSigningUp, signingUp, newUserProfile, handleSubmit, fields: { make, model, year, license, color}}) => {

   onCreateProfile = (values) => {
      isSigningUp(true)
      createCarProfile(values)
      createProfile();
   }

   onSignUp = (values) => {
      isSigningUp(true)
      signupUser(values.email, values.password)      
   }

   return (
      <KeyboardAvoidingView behavior="padding"  keyboardVerticalOffset={Platform.select({ios: 0, android: 25})} style={styles.container}>
      <ScrollView>
         <View style={styles.titleContainer}>
            <Image style={styles.logo} source={require('../../../../Assets/img/ButterFLi-logo-header.png')}/>
            {/* <Text style={styles.title}> ButterFLi </Text> */}
         </View>
         <Text style={{fontSize: 18, fontWeight: "700", justifyContent: "center", paddingLeft: 5, paddingBottom: 5}}>Vehicle Information</Text>
         <View style={styles.field}>
            <Field
               {...make}
               name="make"
               component={TextInputField}
               placeholder="Vehicle Make"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...model}
               name="model"
               component={TextInputField}
               placeholder="Car Model"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...year}
               name="year"
               component={TextInputField}
               placeholder="Year"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...license}
               name="license"
               component={TextInputField}
               placeholder="License Plate"
               validate={this.renderError}
            />
         </View>
         <View style={styles.field}>
            <Field
               {...color}
               name="color"
               component={TextInputField}
               placeholder="Color of Vehicle"
               validate={this.renderError}
            />
         </View>
         <View style={styles.sumbitBtnView}>
            <Button style={styles.submitBtn} onPress={handleSubmit(this.onCreateProfile)}>
               { signingUp &&
                  <Spinner size="small" color="white"/>
                  ||
                  <Text style={styles.btnText}>Submit</Text>
               }
            </Button>
            {/* 
               <Button  style={styles.signup}>
                  <Text style={styles.btnText}>Cancel</Text>
               </Button>
            */}
         </View>
         </ScrollView>
      </KeyboardAvoidingView>
   )
}


var validate = (formProps) => {
   var errors = {};
   if(!formProps.make){
      errors.make = "Please enter the vehicle car make."
   }
   if(!formProps.model){
      errors.model = "Please enter the vehicle model."
   }
   if(!formProps.year){
      errors.year = "Please enter the year of the car."
   }
   if(!formProps.color){
      errors.color = "Please enter color of car."
   }
   return errors;
}

module.exports = reduxForm({
   form: 'createVehicleProfile',
   fields: ['make', 'model', 'year', 'license', 'color'],
   validate: validate
}, null, null)(CreateVehicleProfile);