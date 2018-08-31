import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';



import RideRequestMapContainer from './RideRequestMapContainer';
import NavHeaderComponent from '../../../Components/NavHeaderComponent';
import StartRideButton from '../../../Components/StartRideButton';


const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");
const carMarker = require("../../../Assets/img/carMarker.png");

class RideRequest extends React.Component {

    componentDidMount(){
        this.props.getCurrentLocation();
        this.props.getPassengerRoute();
        // this.watchId = this.props.watchingDriverLocation();
        this.props.getCurrentRoute(Actions.currentScene);
        this.props.getTotalDistance();

        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.props.watchingDriverLocation(position)
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10}
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    } 
    componentDidUpdate(prevProps, prevState) {
        if((this.props.driverSocketId  !== prevProps.driverSocketId) && this.props.user_id) {
            console.log("Changing Socket Id")
            this.props.newSelectedDriverSocketId();
            this.props.updateDriverLocationDetails("socketId", this.props.driverSocketId);
        }
    }

    connectDriver = () => {
        this.props.getDriverStatus("available");
        this.props.postDriverLocation();
    }

    navToPickUp = () => {
        Actions.pickUp({type: "replace"});
        this.props.openMapsRoute('pickUp');
    }

    startTrip = () => {
        Actions.pickUp({type: "replace"});
        this.props.updateBookingDetails("rideRequestStatus", "enRoute");
        this.props.getDriverStatus('pickUp');
    }

    render() {
        return(
        <Container>
            <View style={{flex:1}}>
                {/* <HeaderComponent logo={buttefliLogo}/> */}
                { this.props.bookingDetails && 
                    <NavHeaderComponent 
                    navToPickUp={() => this.navToPickUp()}
                    bookingDetails={this.props.bookingDetails}
                    driverStatus={this.props.driverStatus}
                    />
                }
                {this.props.region.latitude &&
                    <RideRequestMapContainer region={this.props.region} 
                        carMarker={carMarker}
                        getMarkerLocation={this.props.getMarkerLocation}
                        bookingDetails={this.props.bookingDetails}
                        updateWatchDriverLocation={this.props.updateWatchDriverLocation}
                        watchDriverLocation={this.props.watchDriverLocation}
                        routes={this.props.routes}
                    />
                }
            </View>
            <StartRideButton
                startTrip={() => this.startTrip()}
            />    
        </Container>
        );
       
    }
}

export default RideRequest;