import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Container, Form, Item, Input, Label, Picker } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';


import styles from './ProfileContainerStyles';

export const ProfileContainer =({ driverInfo, changeVehcileType,updatedDriverInfo }) => {
	const {firstName, lastName, email, phoneNumber, profilePic} = driverInfo || {};
	const { vehicleType } = updatedDriverInfo || {};

	//Changes phone number to format telephone number
	function formatPhoneNumber(phoneNumberString) {
		var cleaned = ("" + phoneNumberString).replace(/\D/g, '');
		var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
		return (!match) ? null : "(" + match[1] + ") " + match[2] + "-" + match[3];
	}

	const formattedPhoneNum = formatPhoneNumber(phoneNumber);
   return(
		<ScrollView style={styles.container}>
			<View style={styles.avatarHeader}>
				{ profilePic && 
					<Image resizemode="container" style={styles.driverPic} source={{uri:profilePic}} />
					||
					<Icon name="user-circle-o" style={styles.icon} />
				}
				
				<Text style={{color: '#19B5FE', fontSize: 12, marginTop: 15}}>Change Profile Photo</Text>
			</View>
			<View style={{flex: 2}}>
				<Form>
					<Item inlineLabel>
						<Label>First Name</Label>
						<Input defaultValue={firstName}/>
					</Item>
					<Item inlineLabel>
						<Label>Last Name</Label>
						<Input defaultValue={lastName}/>
					</Item>
					<Item inlineLabel>
						<Label>Email</Label>
						<Input defaultValue={email}/>
					</Item>
					<Item inlineLabel>
						<Label>Phone</Label>
						<Input defaultValue={formattedPhoneNum}/>
					</Item>
					<Item inlineLabel>
						<Label>Company</Label>
						<Input defaultValue="SMS Transportation"/>
					</Item>
					<Item inlineLabel picker last>
						<Label>Vehicle Type</Label>
						<Picker
							mode="dropdown"
							iosIcon={<Icon name="angle-down" />}
							style={{ width: undefined }}
							placeholder="Select vehicle type"
							placeholderStyle={{ color: "#bfc6ea" }}
							placeholderIconColor="#007aff"
							selectedValue={vehicleType}
							onValueChange={changeVehcileType.bind(this)}
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

export default ProfileContainer; 