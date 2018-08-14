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

const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");
const carMarker = require("../../../Assets/img/carMarker.png");

class PickUp extends React.Component {

    componentDidMount(){
        // this.props.getCurrentLocation();
        this.props.getDistanceFrom();
        this.props.getPickUpRoute();
    }
    

    componentDidUpdate(prevProps, prevState)  {
        // Changes rideRequestStatus to "arriving"
        if(prevProps.distanceFrom.rows){
        const { duration } = this.props.distanceFrom.rows[0].elements[0] || "";
        const prevDuration = prevProps.distanceFrom.rows[0].elements[0] || "";
            if(prevDuration.duration.value > 300 && duration.value < 300){
                console.log("This is arrival state log");
                console.log(duration);
                console.log("You are arrivng to riders location");
                this.props.updateBookingDetails("rideRequestStatus", "arriving");
            }
        } 
    }

    componentWillUnmount() {
        // navigator.geolocation.clearWatch(this.watchId);
    } 

    
    navToPickUp = () => {
        this.props.openMapsRoute('pick up');
    }

    pickUpPassenger = () => {
        Actions.dropOff({type: "replace"});
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
                    <PickUpMapContainer region={this.props.region} 
                    carMarker={carMarker}
                    getMarkerLocation={this.props.getMarkerLocation}
                    bookingDetails={this.props.bookingDetails}
                    updateWatchDriverLocation={this.props.updateWatchDriverLocation}
                    getPassengerRoute={this.props.getPassengerRoute}
                    routes={this.props.routes}
                    getDistanceFrom={this.props.getDistanceFrom}
                    pickUpRoutes={this.props.pickUpRoutes}
                    />
                }
            </View>
            { this.props.distanceFrom.rows && 
                <PickUpFooterComponent 
                    distanceFrom={this.props.distanceFrom}
                    getDriverStatus={this.props.getDriverStatus}
                    pickUpPassenger={this.pickUpPassenger}
                    updateBookingDetails={this.props.updateBookingDetails}
                    bookingDetails={this.props.bookingDetails}
                />
            }
            { this.props.distanceFrom.rows && 
                <ArrivingFooter 
                    bookingDetails={this.props.bookingDetails} 
                    distanceFrom={this.props.distanceFrom}
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