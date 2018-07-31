import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

//Component Imports
import DropOffMapContainer from './DropOffMapContainer';
import HeaderComponent from '../../../Components/HeaderComponent';
import NavHeaderComponent from '../../../Components/NavHeaderComponent';
import UserFooterComponent from '../../../Components/UserFooterComponent';
import ArrivingFooter from '../../../Components/ArrvingFooterComponent';
import DropOffFooterComponent from '../../../Components/DropOffFooterComponent';

//Image Imports
const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");
const carMarker = require("../../../Assets/img/carMarker.png");

class DropOff extends React.Component {

    componentDidMount(){
        // this.props.getCurrentLocation();

        // Get distance from driver to dropOff location
        this.props.getDistanceFrom();
    }

    componentDidUpdate(prevProps, prevState) {
            
    }

    componentWillUnmount() {
        // navigator.geolocation.clearWatch(this.watchId);
    } 

    
    navToPickUp = () => {
        //Takes user to the PickUp route and open the Google Maps or Waze App
        Actions.pickUp({type: "reset"});
        this.props.openMapsRoute('pick up');
        console.log("start navigation");
    }

    navToHomePage = () => {
        //Takes user to the HomePage route
        Actions.home({type: "replace"});
        console.log("Goto Homepage and end ride");
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
                    <DropOffMapContainer region={this.props.region} 
                    carMarker={carMarker}
                    getMarkerLocation={this.props.getMarkerLocation}
                    bookingDetails={this.props.bookingDetails}
                    updateWatchDriverLocation={this.props.updateWatchDriverLocation}
                    getPassengerRoute={this.props.getPassengerRoute}
                    routes={this.props.routes}
                    getDistanceFrom={this.props.getDistanceFrom}
                    />
                }
            </View>
            { this.props.distanceFrom.rows && 
                <DropOffFooterComponent 
                    distanceFrom={this.props.distanceFrom}
                    getDriverStatus={this.props.getDriverStatus}
                    navToHomePage={this.navToHomePage}
                    updateBookingDetails={this.props.updateBookingDetails}
                />
            }
            { this.props.distanceFrom.rows && 
                <ArrivingFooter 
                    bookingDetails={this.props.bookingDetails} 
                    distanceFrom={this.props.distanceFrom}
                    driverStatus={this.props.driverStatus}
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

export default DropOff;