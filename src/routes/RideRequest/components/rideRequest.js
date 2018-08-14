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
    }

    componentDidUpdate(prevProps, prevState) {
            
    }

    componentWillUnmount() {
        // navigator.geolocation.clearWatch(this.watchId);
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
    }

    render() {
        
        const { status } = this.props.bookingDetails;

        return(
        <Container>
            <View style={{flex:1}}>
                {/* <HeaderComponent logo={buttefliLogo}/> */}
                <NavHeaderComponent 
                    navToPickUp={() => this.navToPickUp()}
                    bookingDetails={this.props.bookingDetails}
                    driverStatus={this.props.driverStatus}
                />
                {this.props.region.latitude &&
                    <RideRequestMapContainer region={this.props.region} 
                        carMarker={carMarker}
                        getMarkerLocation={this.props.getMarkerLocation}
                        bookingDetails={this.props.bookingDetails}
                        updateWatchDriverLocation={this.props.updateWatchDriverLocation}
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