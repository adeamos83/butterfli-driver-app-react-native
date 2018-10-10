import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { Field, reduxForm } from 'redux-form';
import { Text, View, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { Button, Container, Header } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './ForgotPasswordStyles';
import TextField from '../TextField/TextField';
import PassTextField from '../TextField/PassTextField'
import { TextInputField } from '../../../../Components/Common/'
import { Spinner, LoginTextInputField } from '../../../../Components/Common';

import{ createProfile } from '../../modules/login';

class ForgotPasswordContainer extends React.Component {

   onForgotPassword = (values) => {
		console.log("forgot password");
		console.log(values);
   }

   render() {
		const { handleSubmit, fields: {email}} = this.props;
		var loginInProcess = false;

		return (
			<Container style={styles.container}>
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
					/>
				</View>
				<View style={styles.buttonView}>
					<Button info style={styles.signinBtn} onPress={handleSubmit(this.onForgotPassword)}>
					{ false &&
						<Spinner size="small"/>
						||   
						<Text style={styles.btnText}>Submit</Text>
					}
					</Button>
					<Text style={{color: "white", textAlign: "center", paddingTop: 5}}>We'll email a link to reset your password</Text>
				</View>
			</Container>
		);
	}
}


var validate = (formProps) => {
   var errors = {};
   if(!formProps.email){
      errors.email = "Please enter an email."
   }
   return errors;
}
const mapStateToProps = (state) => ({
	currentRoute: state.home.currentRoute,
	loggingIn: state.login.loggingIn,
});

const mapActionCreators = {
	createProfile
}

export default connect(mapStateToProps, mapActionCreators)(reduxForm({
   form: 'forgotPassword',
   fields: ['email'],
   validate: validate
})(ForgotPasswordContainer)); 