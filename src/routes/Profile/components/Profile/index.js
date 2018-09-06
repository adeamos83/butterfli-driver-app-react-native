import React from 'react';
import { connect } from 'react-redux'
import { View, Text, Image, ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Container, Form, Item, Input, Label, Picker, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { getDriverInfo } from '../../../Home/modules/home';
import { ProfileTextInputField } from '../../../../Components/Common/'
import Icon from 'react-native-vector-icons/FontAwesome';


import styles from './ProfileContainerStyles';

let ProfileContainer =({ getDriverInfo, updateDriverProfile, canEditProfile, 
	canEdit, driverInfo, handleSubmit, changeVehicleServiceType }) => {

	const {firstName, lastName, email, phoneNumber, profilePic, serviceType} = driverInfo || {};

	//Changes phone number to format telephone number
	function formatPhoneNumber(phoneNumberString) {
		var cleaned = ("" + phoneNumberString).replace(/\D/g, '');
		var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
		return (!match) ? null : "(" + match[1] + ") " + match[2] + "-" + match[3];
	}

	const formattedPhoneNum = formatPhoneNumber(phoneNumber);
	
	onUpdateProfile = (values) => {
		console.log("Profile Update values", values);
	}

	onEditProfile = (values) => {
		canEditProfile();
		console.log("Send new updated for Profile? ", canEdit);
		if(canEdit){
			console.log("Profile Update values", values);
			updateDriverProfile();
		}
	}

   return(
		<ScrollView style={styles.container}>
			<View style={styles.avatarHeader}>
				{ profilePic && 
					<Image resizemode="container" style={styles.driverPic} source={{uri:profilePic}} />
					||
					<Icon name="user-circle-o" style={styles.icon} />
				}
				<View style={styles.editRow}>
					<Text style={{color: '#19B5FE', fontSize: 12, marginTop: 15}}>Change Profile Photo</Text>
					<Button bordered light small style={styles.editBtn} onPress={handleSubmit(this.onEditProfile)}>
						<Text>{canEdit? "Done" : "Edit"}</Text>
					</Button>
				</View>
			</View>
			<View style={{flex: 2}}>
				<Form>
					<Item inlineLabel>
						<Label>First Name</Label>
							<Field
								name="firstName"
								component={ProfileTextInputField}
								editable={canEdit}
								placeholder="firstName"
								placeholderTextColor="rgba(255,255,255,0.7)"
								returnKeyType="next"
							/>
					</Item>
					<Item inlineLabel>
						<Label>Last Name</Label>
						<Field
							name="lastName"
							component={ProfileTextInputField}
							editable={canEdit}
							placeholder="lastName"
							placeholderTextColor="rgba(255,255,255,0.7)"
							returnKeyType="next"
						/>
					</Item>
					<Item inlineLabel>
						<Label>Email</Label>
						<Field
							name="email"
							component={ProfileTextInputField}
							editable={canEdit}
							placeholder="Email"
							placeholderTextColor="rgba(255,255,255,0.7)"
							returnKeyType="next"
						/>
					</Item>
					<Item inlineLabel>
						<Label>Phone</Label>
						<Field
							name="phoneNumber"
							component={ProfileTextInputField}
							editable={canEdit}
							placeholder="Phone"
							placeholderTextColor="rgba(255,255,255,0.7)"
							returnKeyType="next"
						/>
					</Item>
					<Item inlineLabel>
						<Label>Company</Label>
						<Field
							name="company.name"
							component={ProfileTextInputField}
							editable={canEdit}
							placeholder="Company"
							placeholderTextColor="rgba(255,255,255,0.7)"
							returnKeyType="next"
						/>
					</Item>
					<Item inlineLabel picker last>
						<Label>Service Type</Label>
						<Picker
							mode="dropdown"
							iosIcon={<Icon name="angle-down" />}
							style={{ width: undefined }}
							placeholder="Select service type"
							placeholderStyle={{ color: "#bfc6ea" }}
							placeholderIconColor="#007aff"
							selectedValue={serviceType}
							onValueChange={changeVehicleServiceType.bind(this)}
							enabled={canEdit}
						>
							<Picker.Item label="Wheelchair" value="wheelchair" />
							<Picker.Item label="Gurney" value="gurney" />
							<Picker.Item label="Ambulatory" value="ambulatory" />
							<Picker.Item label="General" value="general" />
						</Picker>
					</Item>
				 </Form>
				 {/* 
					<View style={{flex: 1}}>
						<View style={{borderBottomWidth: 2, borderColor: '#ECECEC', marginBottom: 20}}>
							<Text style={{fontSize: 16, fontWeight: "700", marginTop: 20, marginBottom: 15}}>Vehicle Profile</Text>
						</View>
						<View style={styles.avatarHeader}>
							<View style={styles.imageContainer}>
								{ vehicle.vehiclePic && 
									<Image resizemode="cover" style={styles.vehiclePic} source={{uri: vehicle.vehiclePic}} />
									||
									<Icon name="user-circle-o" style={styles.icon} />
								}
							</View>							
						</View>
						<Item inlineLabel>
							<Label>Car Make</Label>
							<Input defaultValue={vehicle.make} editable={false}/>
						</Item>
						<Item inlineLabel last>
							<Label>Car Model</Label>
							<Input defaultValue={vehicle.model} editable={false}/>
						</Item>
					</View>
				*/}
			</View>
		</ScrollView>
   )
}

var validate = (formProps) => {
   var errors = {};
   // if(!formProps.email){
   //    errors.email = "Please enter an email."
   // }
   // if(!formProps.password){
   //    errors.password = "Please enter a password."
   // }
   return errors;
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ProfileContainer = reduxForm({
  form: 'profile' // a unique identifier for this form
})(ProfileContainer)

// You have to connect() to any reducers that you wish to connect to yourself
ProfileContainer = connect(
	state => ({
	  initialValues: state.profile.driverInfo // pull initial values from account reducer
	}),
	{ load: getDriverInfo } // bind account loading action creator
 )(ProfileContainer)

export default ProfileContainer