import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

import PickUpMapContainer from './PickUpMapContainer';
import HeaderComponent from '../../../Components/HeaderComponent';
import NavHeaderComponent from '../../../Components/NavHeaderComponent';
import UserFooterComponent from '../../../Components/UserFooterComponent';
import ArrivingFooter from '../../../Components/ArrvingFooterComponent';
import PickUpFooterComponent from '../../../Components/PickUpFooterComponent';

const carMarker = require("../../../Assets/img/carMarker.png");
import { getLatLonDiffInMeters } from '../../../util/helper';

class PickUp extends React.Component {

    componentDidMount(){
        this.props.getDistanceFrom();
        this.props.getPickUpRoute();
        this.props.getCurrentRoute(Actions.currentScene);

        //Must remove on launch of beta
        this.props.getPickUpDistance();

        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.props.watchingDriverLocation(position)
                this.props.getDistanceFrom();
                this.props.getPickUpDistance();
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10}
        );

        var  distanceTimer = setInterval(this.props.updateDistanceToPickUp, 120000);
    }
    
    componentDidUpdate(prevProps, prevState)  {
        if((this.props.driverSocketId  !== prevProps.driverSocketId) && this.props.user_id) {
            console.log("Changing Socket Id")
            // this.props.updateBookingDetails("socketId", this.props.driverSocketId);
            this.props.newSelectedDriverSocketId();
            this.props.updateDriverLocationDetails("socketId", this.props.driverSocketId);
            // this.props.postDriverLocation();
        }

        // Get distance pick up location
        // const distFrom = getLatLonDiffInMeters(this.props.watchDriverLocation.coords.latitude, this.props.watchDriverLocation.coords.longitude,
        // this.props.bookingDetails.pickUp.latitude, this.props.bookingDetails.pickUp.longitude);
        
        // Changes rideRequestStatus to "arriving"
        if((this.props.pickUpDistance > 300 && this.props.pickUpDistance < 480) && prevProps.bookingDetails.rideRequestStatus !== "arriving"){
            this.props.updateBookingDetails("rideRequestStatus", "arriving");
        }

        // Changes rideRequestStatus to "arriving"
        // if(prevProps.distanceFrom.rows && this.props.distanceFrom.rows){
        // const { duration } = this.props.distanceFrom.rows[0].elements[0] || "";
        // const prevDuration = prevProps.distanceFrom.rows[0].elements[0] || "";
        //     // if(prevDuration.duration.value > 300 && duration.value < 300){
        //     //     this.props.updateBookingDetails("rideRequestStatus", "arriving");
        //     // }
        //     if(distFrom < 300 && prevProps.bookingDetails.rideRequestStatus !== "arriving"){
        //         console.log("This is the distance to should be less than 300ft pick up: ",distFrom);
        //         this.props.updateBookingDetails("rideRequestStatus", "arriving");
        //     }
        // } 
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
        clearInterval(this.distanceTimer);
    } 

    
    navToPickUp = () => {
        this.props.openMapsRoute('pick up');
    }

    pickUpPassenger = () => {
        Actions.dropOff({type: "replace"});
    }

    render() {
        return(
        <Container>
            <View style={{flex:1}}>
                {/* <HeaderComponent logo={buttefliLogo}/> */}
                
                {this.props.region.latitude &&
                    <PickUpMapContainer region={this.props.region} 
                    carMarker={carMarker}
                    getMarkerLocation={this.props.getMarkerLocation}
                    bookingDetails={this.props.bookingDetails}
                    updateWatchDriverLocation={this.props.updateWatchDriverLocation}
                    getPassengerRoute={this.props.getPassengerRoute}
                    routes={this.props.routes}
                    getDistanceFrom={this.props.getDistanceFrom}
                    pickUpRoutes={this.props.pickUpRoutes}
                    watchDriverLocation={this.props.watchDriverLocation}
                    getPickUpDistance={this.props.getPickUpDistance}
                    />
                }
                <NavHeaderComponent 
                    navToPickUp={() => this.navToPickUp()}
                    bookingDetails={this.props.bookingDetails}
                    driverStatus={this.props.driverStatus}
                    currentRoute={this.props.currentRoute}
                />
            </View>
            { this.props.distanceFrom.rows && 
                <ArrivingFooter 
                    bookingDetails={this.props.bookingDetails} 
                    distanceFrom={this.props.distanceFrom}
                    pickUpDistance={this.props.pickUpDistance}
                    dropOffDistance={this.props.pickUpDistance}
                />
            }
            { this.props.pickUpDistance < 300 &&
                <PickUpFooterComponent 
                    distanceFrom={this.props.distanceFrom}
                    getDriverStatus={this.props.getDriverStatus}
                    pickUpPassenger={this.pickUpPassenger}
                    updateBookingDetails={this.props.updateBookingDetails}
                    bookingDetails={this.props.bookingDetails}
                    pickUpDistance={this.props.pickUpDistance}
                />
            } 
            { this.props.distanceFrom.rows &&
                <UserFooterComponent 
                    bookingDetails={this.props.bookingDetails}
                    distanceFrom={this.props.distanceFrom}
                    driverStatus={this.props.driverStatus}
                />
            }   
        </Container>
        );
       
    }
}

export default PickUp;