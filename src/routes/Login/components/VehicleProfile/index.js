import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, View, TextInput, Image, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './VehicleProfileStyles';
import TextField from '../TextField/TextField';
import { Spinner, TextInputField } from '../../../../Components/Common';


export const CreateVehicleProfile =({addAlert, user_id, signupUser, createUserProfile, createProfile, createCarProfile, 
   isSigningUp, signingUp, newUserProfile, handleSubmit, fields: { make, model, year, license, color}}) => {

   onCreateProfile = (values) => {
      isSigningUp(true)
      createCarProfile(values)
      signupUser();
   }

   return (
      <ScrollView contentInset={{top: (Platform.OS !== 'ios' ? 54 : 64), left: 0, bottom: 0, right: 0}}
      contentOffset={{x: 0, y: -(Platform.OS !== 'ios' ? 54 : 64)}}>
      <View style={styles.outerContainer}>
            <View style={styles.field}>
               <Field
                  {...make}
                  withRef
                  refField='make'
                  ref={(c) => this.make = c}
                  capitalize="words"
                  name="make"
                  component={TextInputField}
                  placeholder="Vehicle Make"
                  validate={this.renderError}
                  returnKeyType="next"
                  onEnter={() => { 
                     this.model.getRenderedComponent().refs.model.focus()
                  }}
               />
            </View>
            <View style={styles.field}>
               <Field
                  {...model}
                  withRef
                  refField='model'
                  ref={(c) => this.model = c}
                  capitalize="words"
                  name="model"
                  component={TextInputField}
                  placeholder="Car Model"
                  validate={this.renderError}
                  returnKeyType="next"
                  onEnter={() => { 
                     this.year.getRenderedComponent().refs.year.focus()
                  }}
               />
            </View>
            <View style={styles.field}>
               <Field
                  withRef
                  refField='year'
                  ref={(c) => this.year = c}
                  {...year}
                  name="year"
                  component={TextInputField}
                  placeholder="Year"
                  keyboardType="numbers-and-punctuation"
                  validate={this.renderError}
                  returnKeyType="next"
                  onEnter={() => { 
                     this.license.getRenderedComponent().refs.license.focus()
                  }}
               />
            </View>
            <View style={styles.field}>
               <Field
                  withRef
                  refField='license'
                  ref={(c) => this.license = c}
                  capitalize="words"
                  {...license}
                  name="license"
                  component={TextInputField}
                  placeholder="License Plate"
                  validate={this.renderError}
                  returnKeyType="next"
                  onEnter={() => { 
                     this.color.getRenderedComponent().refs.color.focus()
                  }}
               />
            </View>
            <View style={styles.field}>
               <Field
                  {...color}
                  withRef
                  refField='color'
                  ref={(c) => this.color = c}
                  capitalize="words"
                  name="color"
                  component={TextInputField}
                  placeholder="Color of Vehicle"
                  validate={this.renderError}
               />
            </View>
            <View style={styles.sumbitBtnView}>
					<Button  style={styles.cancel}>
						<Text style={styles.btnText}>Cancel</Text>
					</Button>
					<Button style={styles.submitBtn} onPress={handleSubmit(this.onCreateProfile)}>
                  { signingUp &&
                     <Spinner size="small" color="white"/>
                     ||
                     <Text style={styles.btnText}>Submit</Text>
                  }
               </Button>
            </View>
         </View>
         </ScrollView>
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