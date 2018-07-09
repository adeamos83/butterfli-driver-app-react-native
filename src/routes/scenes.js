import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import HomeContainer from './Home/container/HomeContainer';
import PickUpContainer from './PickUp/container/PickUpContainer';

const scenes = Actions.create(
    <Scene key='root' hideNavBar>
        <Scene key="home" component={HomeContainer} title="home" intial />
        <Scene key="pickUpPassenger" component={PickUpContainer} title="pickUpPassenger"/>

    </Scene>
);

export default scenes;