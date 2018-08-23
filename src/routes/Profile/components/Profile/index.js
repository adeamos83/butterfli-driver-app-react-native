import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Container, Form, Item, Input, Label  } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';


import styles from './ProfileContainerStyles';

export const ProfileContainer =({ driverInfo }) => {
	const {firstName, lastName, email, phoneNumber, profilePic, vehicle} = driverInfo || {};
	console.log(firstName)
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
					<Item inlineLabel last>
						<Label>Phone</Label>
						<Input defaultValue={phoneNumber}/>
					</Item>
					<Item inlineLabel last>
						<Label>Company</Label>
						<Input defaultValue="SMS Transportation"/>
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