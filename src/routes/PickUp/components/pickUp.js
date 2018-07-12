import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';



import PickUpMapContainer from './PickUpMapContainer';
import HeaderComponent from '../../../Components/HeaderComponent';
import NavHeaderComponent from '../../../Components/NavHeaderComponent';
const buttefliLogo = require("../../../Assets/img/butterfli_name_logo.png");
const carMarker = require("../../../Assets/img/carMarker.png");

class PickUp extends React.Component {

    componentDidMount(){
        // this.props.getCurrentLocation();
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
                    />
                }
            </View>    
        </Container>
        );
       
    }
}

export default PickUp;