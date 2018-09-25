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
import RideSumarry from './RideSummary';

//Image Imports
const carMarker = require("../../../Assets/img/carMarker.png");

class DropOff extends React.Component {

    componentDidMount(){
        // Get distance from driver to dropOff location
        this.props.getDistanceFrom();
        this.props.getDropOffRoute();
        this.props.getCurrentRoute(Actions.currentScene);

        // this.watchId = navigator.geolocation.watchPosition(
        //     (position) => {
        //         this.props.watchingDriverLocation(position)
        //         this.props.getDropOffDistance();
        //         this.props.getDistanceFrom();
        //     },
        //     (error) => console.log(error.message),
        //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10}
        // );
    }

    componentDidUpdate(prevProps, prevState){
        if((this.props.driverSocketId  !== prevProps.driverSocketId) && this.props.user_id) {
            console.log("Changing Socket Id")
            this.props.newSelectedDriverSocketId();
            this.props.updateDriverLocationDetails("socketId", this.props.driverSocketId);
        }

        // Changes rideRequestStatus to "arriving"
        if((this.props.dropOffDistance > 300 && this.props.dropOffDistance < 480) && prevProps.bookingDetails.rideRequestStatus !== "unloading"){
            this.props.updateBookingDetails("rideRequestStatus", "unloading");
        }
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
        { this.props.bookingDetails.rideRequestStatus !== "completed" && 
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    {/* <HeaderComponent logo={buttefliLogo}/> */}
                    
                    {this.props.region.latitude &&
                        <DropOffMapContainer region={this.props.region} 
                        carMarker={carMarker}
                        getMarkerLocation={this.props.getMarkerLocation}
                        bookingDetails={this.props.bookingDetails}
                        updateWatchDriverLocation={this.props.updateWatchDriverLocation}
                        watchDriverLocation={this.props.watchDriverLocation}
                        getPassengerRoute={this.props.getPassengerRoute}
                        routes={this.props.routes}
                        getDistanceFrom={this.props.getDistanceFrom}
                        dropOffRoutes={this.props.dropOffRoutes}
                        getDropOffDistance={this.props.getDropOffDistance}
                        />
                    }
                    <NavHeaderComponent 
                        navToPickUp={() => this.navToPickUp()}
                        bookingDetails={this.props.bookingDetails}
                        driverStatus={this.props.driverStatus}
                        currentRoute={this.props.currentRoute}
                    />
                </View>
                { this.props.dropOffDistance < 300 && 
                    <DropOffFooterComponent 
                        distanceFrom={this.props.distanceFrom}
                        getDriverStatus={this.props.getDriverStatus}
                        navToHomePage={this.navToHomePage}
                        updateBookingDetails={this.props.updateBookingDetails}
                        dropOffDistance={this.props.dropOffDistance}
                    />
                }
                { this.props.distanceFrom.rows && 
                    <ArrivingFooter 
                        bookingDetails={this.props.bookingDetails} 
                        distanceFrom={this.props.distanceFrom}
                        driverStatus={this.props.driverStatus}
                        dropOffDistance={this.props.dropOffDistance} 
                    />
                }
                { this.props.distanceFrom.rows &&
                    <UserFooterComponent 
                        bookingDetails={this.props.bookingDetails}
                        distanceFrom={this.props.distanceFrom}
                        driverStatus={this.props.driverStatus}
                    />
                }  
            </View> 
            || 
            <RideSumarry
                bookingDetails={this.props.bookingDetails}
                navToHomePage={this.navToHomePage}
                bookingRequestCompleted={this.props.bookingRequestCompleted}
            />
        }
        </Container>
        );
    }
}

export default DropOff;