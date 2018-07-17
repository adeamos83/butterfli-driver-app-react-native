import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';



import PickUpMapContainer from './PickUpMapContainer';
import HeaderComponent from '../../../Components/HeaderComponent';
import NavHeaderComponent from '../../../Components/NavHeaderComponent';
import UserFooterComponent from '../../../Components/UserFooterComponent';
import ArrivingFooter from '../../../Components/ArrvingFooterComponent';
const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");
const carMarker = require("../../../Assets/img/carMarker.png");

class PickUp extends React.Component {

    componentDidMount(){
        // this.props.getCurrentLocation();
        this.props.getDistanceFrom();
    }

    componentDidUpdate(prevProps, prevState) {
            
    }

    componentWillUnmount() {
        // navigator.geolocation.clearWatch(this.watchId);
    } 

    
    navToPickUp = () => {
        Actions.pickUp({type: "reset"});
        this.props.openMapsRoute('pick up');
        console.log("start navigation");
    }

    render() {
        
        const { status } = this.props.bookingDetails;

        return(
        <Container>
            <View style={{flex:1}}>
                <HeaderComponent logo={buttefliLogo}/>
                <NavHeaderComponent 
                    navToPickUp={() => this.navToPickUp()}
                    bookingDetails={this.props.bookingDetails}
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
                    />
                }
            </View>
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
                />
            }    
        </Container>
        );
       
    }
}

export default PickUp;