import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Text, View, TextInput, Image, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Button, Header } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './CreateProfileStyles';
import TextField from '../TextField/TextField';
import { TextInputField } from '../../../../Components/Common';
import CreateVehicleProfile from '../VehicleProfile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createProfile,
	getInputData,
	createCarProfile,
	createUserProfile,
	gotoCarProfile,
	signupUser,
	clearCreateProfile,
	isLoggingIn,
	isSigningUp } from '../../modules/login';


class CreateProfile extends React.Component  {
   
   onCreateProfile = (values) => {
		console.log(values);
		this.props.createUserProfile(values);
		// this.props.gotoCarProfile(true)
		this.props.signupUser();
	}
	componentWillUnmount() {
		this.props.clearCreateProfile();
	}

	render(){
		const { createProfile, signupUser, createUserProfile, createCarProfile,
			navToCarPage, isSigningUp, newUserProfile, signingUp,handleSubmit, 
			fields: {firstName, lastName, email, password, companyCode, phoneNumber}} = this.props

	
   return (
      <KeyboardAvoidingView behavior="padding"  keyboardVerticalOffset={Platform.select({ios: 0, android: 25})} style={styles.container}>
      <Header/>
      { (true) && 
         <ScrollView contentInset={{top: (Platform.OS !== 'ios' ? 54 : 64), left: 0, bottom: 0, right: 0}} contentOffset={{x: 0, y: -(Platform.OS !== 'ios' ? 54 : 64)}}>
				{/*
					<View style={styles.titleContainer}>
						<Image style={styles.logo} source={require('../../../../Assets/img/ButterFLi-logo-header.png')}/>
					</View>
            */}
				<View style={styles.outerContainer}>
					<View style={styles.splitField}>
						<View style={styles.fieldHalf}>
							<Field
								{...firstName}
								withRef
								refField='firstName'
								ref={(c) => this.firstName = c}
								name="firstName"
								capitalize="words"
								component={TextInputField}
								placeholder="First Name"
								validate={this.renderError}
								returnKeyType="next"
								onEnter={() => { 
									this.lastName.getRenderedComponent().refs.lastName.focus()
								}}
							/>
						</View>
						<View style={styles.fieldHalf}>
							<Field
								{...lastName}
								withRef
								refField='lastName'
								capitalize="words"
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
					</View>
					<View style={styles.field}>
						<Field
							{...email}
							withRef
							refField='email'
							capitalize="words"
							ref={(c) => this.email = c}
							name="email"
							component={TextInputField}
							placeholder="Email"
							validate={this.renderError}
							keyboardType="email-address"
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
							name="phoneNumber"
							component={TextInputField}
							placeholder="Phone Number"
							keyboardType="numbers-and-punctuation"
							validate={this.renderError}
							returnKeyType="next"
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
							component={TextInputField}
							placeholder="Password"
							validate={this.renderError}
							secureTextEntry
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
							capitalize="words"
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
					signupUser={signupUser}
            />
         }
      </KeyboardAvoidingView>
	)
	}
}


var validate = (formProps) => {
   var errors = {};
   if(!formProps.firstName){
      errors.firstName = "First name is required."
	} else {
		errors.firstName = undefined
	}
   if(!formProps.lastName){
      errors.lastName = "Last name is required.."
	}
	if(!formProps.email){
      errors.email = "Email is required."
	}
   if(!formProps.phonenumber){
      errors.phonenumber = "Phone number is required."
	}
	if(!formProps.password){
      errors.password = "Password is required."
	}
	// if(!formProps.companyCode){
   //    errors.companyCode = "Company Code is required."
   // }
   return errors;
}

const mapStateToProps = (state) => ({
   user_id: state.login.user_id || "",
    token: state.login.token,
    expData: state.login.expData,
    alerts: state.alerts,
    needsProfile: state.login.needsProfile,
    inputData: state.login.inputData || {},
    vehicleProfile: state.login.vehicleProfile || {},
    userProfile: state.login.userProfile || {},
    navToCarPage: state.login.navToCarPage || "",
    loggingIn: state.login.loggingIn,
    signingUp: state.login.signingUp,
    newUserProfile: state.login.newUserProfile || {},
    currentRoute: state.home.currentRoute,
});

const mapActionCreators = {
	createProfile,
	signupUser,
	getInputData,
	createCarProfile,
	createUserProfile,
	gotoCarProfile,
	isLoggingIn,
	clearCreateProfile,
	isSigningUp,
};

// export default connect(mapStateToProps, mapActionCreators)(CreateProfile)
export default connect(mapStateToProps, mapActionCreators)(reduxForm({
   form: 'createProfile',
   fields: ['firstName', 'lastName', 'email', 'phoneNumber', 'password', 'companyCode'],
   validate: validate
})(CreateProfile));