import React from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux'
import BackgroundGeolocation from "react-native-background-geolocation";


import { Actions } from 'react-native-router-flux';

import MapContainer from './MapContainer';
import Fab from './FAB';
import NewBooking from './NewBooking'

const carMarker = require("../../../Assets/img/carMarker.png");

class Home extends React.Component {

    componentDidMount(){
        // this.watchId = this.props.watchingDriverLocation();
        this.props.getCurrentLocation();
        // this.props.getDriverInfo();
        this.props.getCurrentRoute();
        // this.props.getRideHistory();
        
        //This function checks to see if this driver has a post driver location
        this.props.checkDriverLocation();
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.props.watchingDriverLocation(position)
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10}
        );
    }

    heartTest = (location) => {
        console.log("This heartbeat is from the home route");
        console.log('- [event] location: ', location); 
    }

	componentDidUpdate(prevProps, prevState) {
		if((this.props.driverSocketId  !== prevProps.driverSocketId) && this.props.user_id) {
			console.log("Changing Socket Id");
			if(this.props.driverStatus !== "notAvailable"){
                console.log("Getting new Socket Id");
                this.props.newSelectedDriverSocketId();
                this.props.updateDriverLocationDetails("socketId", this.props.driverSocketId);
			}
		}
	}

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
        BackgroundGeolocation.un('heartbeat', this.heartTest);
    } 

    connectDriver = () => {
		if(Object.keys(this.props.selectedVehicle).length !== 0 && this.props.selectedVehicle.constructor === Object){
			this.props.isDriverConnecting(true);
			const rk = this;
			
			// This enables the drivers to receives ride request from the socket.io server
			if(this.props.driverStatus == "notAvailable"){
                this.props.getDriverSocketId();
                if(this.props.driverLocation.driver){
                    console.log("Making rider available")
                    if(this.props.user_id){
                        this.props.getDriverStatus("available");
                    }
                }
			}

			// This disonnects drivers from socket.io server and driver will not longer received ride requests
			if(this.props.driverStatus !== "notAvailable"){
                this.props.getDriverStatus("notAvailable");
                this.props.disconnectSocketIO();
			}
		} else {
			Actions.error_modal({data: "Must select a vehicle to recieve ride requests."})
		}
    }
    
    render() {
        const { rideRequestStatus } = this.props.bookingDetails;
        return(
        <Container>
            { (rideRequestStatus !== "request") &&
                <View style={{flex:1}}>
                    {/* <HeaderComponent logo={buttefliLogo}/> */}
                    {(this.props.region.latitude && this.props.watchDriverLocation.coords) &&
                        <MapContainer region={this.props.region} 
                        getInputData={this.props.getInputData}
                        carMarker={carMarker}
                        getMarkerLocation={this.props.getMarkerLocation}
                        watchDriverLocation={this.props.watchDriverLocation}
                        />
                    }
                    <Fab 
                        onPressAction={() => this.connectDriver()}
                        driverStatus={this.props.driverStatus}  
                        driverConnecting={this.props.driverConnecting}
                    />
                </View>
                ||
                ( rideRequestStatus == "request") &&
                <NewBooking 
                    bookingDetails={this.props.bookingDetails} 
                    openMapsRoute={this.props.openMapsRoute}
                    getDriverStatus={this.props.getDriverStatus}
                    cancelBooking={this.cancelBooking}
                    updateBookingDetails={this.props.updateBookingDetails}
                    rejectBookingRequest={this.props.rejectBookingRequest}
                    acceptRideRequest={this.props.acceptRideRequest}
                /> 
            }           
        </Container>
        );
       
    }
}

export default Home;