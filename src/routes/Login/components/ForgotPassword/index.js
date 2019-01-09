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

import{ createProfile, resetPassword, clearResetPassword } from '../../modules/login';

class ForgotPasswordContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			resetState: this.props.resetMessage.statusCode || ""
		};
	}

	componentDidMount(){
		this.setState({resetState: {}});
		this.props.clearResetPassword();
	}

   onForgotPassword = (values) => {
		this.props.resetPassword(values.email)
		this.setState({resetState: this.props.resetMessage})
		console.log("This is resetmessage", this.props.resetMessage);
		console.log("This is resetState", this.state.resetState)
   }

   render() {
		const { isLoading, resetMessage, handleSubmit, fields: {email}} = this.props;
		const { statusCode } = resetMessage
		var loginInProcess = false;

		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.titleContainer}>
					<Image style={styles.logo} source={require('../../../../Assets/img/butterfli_name_logo.png')}/>
					<Text style={styles.subTitle}>Freedom Leading To Independence</Text>
				</View>
				{(statusCode !== 200) &&
					<View  style={{flex:1}}>
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
							{ isLoading &&
								<Spinner size="small"/>
								||   
								<Text style={styles.btnText}>Submit</Text>
							}
							</Button>
							<Text style={{color: "white", textAlign: "center", paddingTop: 5}}>We'll email a link to reset your password</Text>
						</View>
					</View>
					||
					<View style={{flex:1}}>
							<Text style={styles.title}>Password has been reset. Please check your email.</Text>
							<Button info style={styles.loginBtn} onPress={() => Actions.login({type: 'replace'})}>
								<Text style={styles.btnText}>Back to Login</Text>
							</Button>
					</View>
				}
				</KeyboardAvoidingView>
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
	isLoading: state.login.isLoading,
	resetMessage: state.login.resetMessage || {}
});

const mapActionCreators = {
	createProfile,
	resetPassword,
	clearResetPassword
}

export default connect(mapStateToProps, mapActionCreators)(reduxForm({
   form: 'forgotPassword',
   fields: ['email'],
   validate: validate
})(ForgotPasswordContainer)); 