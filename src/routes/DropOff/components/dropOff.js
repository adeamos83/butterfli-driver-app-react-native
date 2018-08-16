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
const carMarker = require("../../../Assets/img/carMarker.png");

class DropOff extends React.Component {

    componentDidMount(){
        // Get distance from driver to dropOff location
        this.props.getDistanceFrom();
        this.props.getDropOffRoute();
        this.watchId = this.props.watchDriverLocation();

    }

    componentDidUpdate(prevProps, prevState) {
            
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    } 

    
    navToPickUp = () => {
        //Takes user to the Drop Off route and open the Google Maps or Waze App
        this.props.openMapsRoute('dropOff');
    }

    navToHomePage = () => {
        //Takes user to the HomePage route
        Actions.home({type: "replace"});
        console.log("Goto Homepage and end ride");
    }

    render() {
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
                    dropOffRoutes={this.props.dropOffRoutes}
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