import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, ScrollView } from 'react-native';
import { Container, Header, Button, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './SelectVehicleStyles';
import { Spinner } from '../../../../Components/Common';

import { getCurrentRoute } from '../../../Home/modules/home'
import { getSelectedVehicle, updateVehicleProfile, canEditVehicleProfile, clearVehicleProfile, getDriverInfo } from '../../../Profile/modules/profile';
import { getVehicleGarage } from '../../modules/login';


class SelectVehicleContainer extends React.Component { 
	componentDidMount(){
			this.props.getCurrentRoute();
			this.props.getDriverInfo();
			// if(this.props.driverInfo){
			//    this.props.getVehicleGarage();
			// }
			if(this.props.driverInfo.vehicle){
				this.props.getSelectedVehicle(this.props.driverInfo.vehicle);
			}
      }

   componentDidUpdate(prevProps, prevState) {
      // console.log("Testing user_id boolean", this.props.user_id);
      // if( (prevProps.driverInfo.companyName) && this.props.user_id){
      //       console.log("This is the vehicle container running")
      //    this.props.getVehicleGarage();
	  // }
	  
		if(!this.props.driverInfo.vehicle && prevProps.driverInfo.vehicle){
			if( (prevProps.driverInfo.companyName) && this.props.user_id){
			      console.log("This is the vehicle container running")
			   this.props.getVehicleGarage();
			}
		}
   }
   
   onListPress = (data) => {
		this.props.getSelectedVehicle(data);
		this.props.canEditVehicleProfile();
      console.log("here is the selected data: ", data)
      // this.props.updateVehicleProfile()
   }

   onEditProfile = (values) => {
		// this.props.canEditVehicleProfile();
		if(this.props.driverInfo.vehicle){
			this.props.clearVehicleProfile();
		} else {
			this.props.canEditVehicleProfile();
		}
		// this.props.clearVehicleProfile();
		console.log("Send new updated for Vehicle? ", this.props.canEditVehicle);
		// if(canEditVehicle){
			
		// }
	}

	onSumbit = () => {
		this.props.updateVehicleProfile();
	}

	render() {
		const { driverInfo, vehicleGarage, clearVehicleProfile, selectedVehicle, canEditVehicle, vehicleLoading  } = this.props
		const { serviceType, make, model, licensePlate, vinNumber} = selectedVehicle || {}
		const { vehicle } = driverInfo || {}
      console.log("this is the vehicle garage", vehicleGarage);
      
		return (
			<Container>
				<Header />
					{/*
						<View style={{borderBottomWidth: 2, borderColor: '#ECECEC', marginBottom: 20, alignItems: "center"}}>
							<Text style={{fontSize: 16, fontWeight: "700", marginTop: 20, marginBottom: 15}}>Ride History</Text>
						</View>
               */}
               { (selectedVehicle.make || vehicle) && 
                  <Content>
                     <View style={{flex: 1, justifyContent: "center", flexDirection: 'row', paddingTop: 30, paddingVertical: 10}}>
                        <View style={styles.circle}>
                           <Icon name="car" style={{ color: "#fff", fontSize: 50, opacity: 5}} />
                        </View>
                     </View>
                     <View style={styles.editRow}>
                        <Button bordered small style={styles.editBtn} onPress={() => this.onEditProfile()}>
                           <Text style={{color: '#000'}}>Change</Text>
                        </Button>
                     </View>
                     <List>
                        <ListItem>
                           <Text style={styles.listText}>Vehicle: </Text>
                           <Text>{make + " " + model}</Text>
                        </ListItem>
                        <ListItem>
                           <Text style={styles.listText}>License Plate: </Text>
                           <Text>{licensePlate}</Text>
                        </ListItem>
                        <ListItem>
                           <Text style={styles.listText}>Service Type: </Text>
                           <Text>{serviceType}</Text>
                        </ListItem>
                     </List>
                     <View style={styles.homeRow}>
                        <Button success style={styles.signinBtn} onPress={() => this.onSumbit()}>
                           <Text style={styles.btnText}>Submit</Text>
                        </Button>
                     </View>
                  </Content>
						||
                  <Content style={{paddingTop: 10}}>
                  { vehicleGarage && 
                        <View>
									{!vehicleLoading && 
										<List 
										dataArray={vehicleGarage} 
										renderRow={(item) =>
											<ListItem avatar style={{paddingBottom: 10}} onPress={() => this.onListPress(item)}>
												<Left>
													<Icon name="car" style={{ color: "#663399", fontSize: 50, opacity: 5}} />
												</Left>
												<Body>
												<Text>{item.make + " " + item.model}</Text>
												<Text note>
													{"Plate: " + item.licensePlate}
													{/*
															<View style={{paddingHorizontal: 5}}>
															<Icon name="circle" style={{ color: "#ccc", fontSize: 8, opacity: 5}} />
															</View>
															{"Vin: " + item.vinNumber}
													*/}
												</Text>
												</Body> 
												<Right>
														<Text note>{item.serviceType}</Text>
												</Right>
											</ListItem>
										}
										/>
										||
										<View style={styles.spinnerStyle}>
											<Spinner size="large" color="#663399"/>
										</View>
									}
                     	</View>
                  ||
						<View style={styles.noHistoryContainer}>
								<Text> No Vehicles Found</Text>
						</View>
               }
                  

                  </Content>
               }
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
   driverInfo: state.profile.driverInfo || {},
   user_id: state.login.user_id,
   vehicleGarage: state.login.vehicleGarage || [],
   selectedVehicle: state.profile.selectedVehicle || {},
   canEditVehicle: state.profile.canEditVehicle,
   vehicleLoading: state.profile.vehicleLoading
});

const mapActionCreators = {
	getCurrentRoute,
	getVehicleGarage,
	getSelectedVehicle,
	updateVehicleProfile,
	canEditVehicleProfile,
	getDriverInfo, 
	clearVehicleProfile
};
export default connect(mapStateToProps, mapActionCreators)(SelectVehicleContainer)