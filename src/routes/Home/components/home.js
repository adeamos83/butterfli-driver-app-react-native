import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';



import MapContainer from './MapContainer';
import HeaderComponent from '../../../Components/HeaderComponent';
import FooterComponent from '../../../Components/FooterComponent';
import UserFooterComponent from '../../../Components/UserFooterComponent';
import InRouteFooter from '../../../Components/InRouteFooter';
import Fab from './FAB';
import NewBookingCard from './NewBookingCard'
import NewBooking from './NewBooking'
import PickUpFooterComponent from '../../../Components/PickUpFooterComponent';

const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");
const carMarker = require("../../../Assets/img/carMarker.png");

class Home extends React.Component {


    
    componentDidMount(){
        this.props.getCurrentLocation();
        this.props.getDriverInfo();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.bookingDetails.status == "pending" && prevProps.bookingDetails.status !=="pending") {
            console.log("You have a new booking");
            console.log(this.props.bookingDetails);
        }

        if(this.props.driverStatus == "available" && prevProps.driverStatus !=="available"){
            this.watchId = this.props.watchDriverLocation();
        }

        if(this.props.driverStatus === "pickUp" && prevProps.driverStatus !=="pickUp") {
            Actions.rideRequest({type: "reset"});
        }

        if(this.props.driverSocketId  && !prevProps.driverSocketId) {
            this.props.postDriverLocation();
        }
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    } 

    connectDriver = () => {
        this.props.getDriverStatus("available");
        this.props.getDriverSocketId();
    }
    
    cancelBooking = () => {
        this.props.getNearDriverAlerted(true);
        this.props.updateRideRequestStatus();
        console.log("Cancel Button Pressed");
    }

    render() {
        const { rideRequestStatus } = this.props.bookingDetails;

        return(
        <Container>
        { (rideRequestStatus !== "request") &&
                <View style={{flex:1}}>
                    {/* <HeaderComponent logo={buttefliLogo}/> */}
                    {this.props.region.latitude &&
                        <MapContainer region={this.props.region} 
                        getInputData={this.props.getInputData}
                        carMarker={carMarker}
                        getMarkerLocation={this.props.getMarkerLocation}
                        />
                    }
                    <Fab 
                        onPressAction={() => this.connectDriver()}
                        
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
                /> 
            }           
        </Container>
        );
       
    }
}

export default Home;