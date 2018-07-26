import React from 'react';
import { Actions, Scene, Drawer } from 'react-native-router-flux';
import HomeContainer from './Home/container/HomeContainer';
import RideRequestContainer from './RideRequest/container/RideRequestContainer';
import PickUpContainer from './PickUp/container/PickUpContainer';
import DropOffContainer from './DropOff/container/DropOffContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';

//Drawer Imports
import Menu from '../Components/Menu';
import Drawer1 from '../Components/Drawer1';
import Drawer2 from '../Components/Drawer2';
import HeaderComponent from '../Components/HeaderComponent';


const MenuIcon = () => {
    return(
        <Icon name='user-circle-o' size={30} color="green"/>
    )
}

const scenes = Actions.create(
    <Scene key='root' hideNavBar>
        
        <Drawer 
            key="drawer"
            contentComponent={Menu}
            hideDrawerButton="true"
            drawerWidth={250}
            navBar={HeaderComponent}
        >
            <Scene key="home" component={HomeContainer} title="home"/>
            <Scene key="rideRequest" component={RideRequestContainer} title="rideRequest"/>
            <Scene key="pickUp" component={PickUpContainer} title="pickUp"/>
            <Scene key="dropOff" component={DropOffContainer} title="dropOff"/>
            <Scene key="drawer1" component={Drawer1} title="Page 1"/>
            <Scene key="drawer2" component={Drawer2} title="Page 2"/>
        </Drawer>



    </Scene>
);

export default scenes;