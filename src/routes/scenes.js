import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import HomeContainer from './Home/container/HomeContainer';
import RideRequestContainer from './RideRequest/container/RideRequestContainer';
import PickUpContainer from './PickUp/container/PickUpContainer';
import DropOffContainer from './DropOff/container/DropOffContainer';

const scenes = Actions.create(
    <Scene key='root' hideNavBar>
        <Scene key="home" component={HomeContainer} title="home" intial />
        <Scene key="rideRequest" component={RideRequestContainer} title="rideRequest"/>
        <Scene key="pickUp" component={PickUpContainer} title="pickUp"/>
        <Scene key="dropOff" component={DropOffContainer} title="dropOff"/>

    </Scene>
);

export default scenes;