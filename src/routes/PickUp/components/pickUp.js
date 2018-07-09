import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';



import PickUpMapContainer from './PickUpMapContainer';
import HeaderComponent from '../../../Components/HeaderComponent';
import FooterComponent from '../../../Components/FooterComponent';
import InRouteFooter from '../../../Components/InRouteFooter';

const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");
const carMarker = require("../../../Assets/img/carMarker.png");

class PickUp extends React.Component {

    componentDidMount(){
        this.props.getCurrentLocation();
        this.props.getPassengerRoute();
    }

    componentDidUpdate(prevProps, prevState) {
            
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    } 

    connectDriver = () => {
        this.props.getDriverStatus("available");
        this.props.postDriverLocation();
    }

    render() {
        
        const { status } = this.props.bookingDetails;

        return(
        <Container>
            <View style={{flex:1}}>
                <HeaderComponent logo={buttefliLogo}/>
                {this.props.region.latitude &&
                    <PickUpMapContainer region={this.props.region} 
                    carMarker={carMarker}
                    getMarkerLocation={this.props.getMarkerLocation}
                    bookingDetails={this.props.bookingDetails}
                    updateWatchDriverLocation={this.props.updateWatchDriverLocation}
                    getPassengerRoute={this.props.getPassengerRoute}
                    routes={this.props.routes}
                    />
                }
                <InRouteFooter />
            </View>    
        </Container>
        );
       
    }
}

export default PickUp;