import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import HomeContainer from './Home/container/HomeContainer';
import RideRequestContainer from './RideRequest/container/RideRequestContainer';

const scenes = Actions.create(
    <Scene key='root' hideNavBar>
        <Scene key="home" component={HomeContainer} title="home" intial />
        <Scene key="rideRequest" component={RideRequestContainer} title="rideRequest"/>
    </Scene>
);

export default scenes;