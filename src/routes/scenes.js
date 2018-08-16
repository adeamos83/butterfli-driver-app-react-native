import React from 'react';
import { Actions, Scene, Drawer } from 'react-native-router-flux';
import LoginContainer from './Login/container/LoginContainer';
import HomeContainer from './Home/container/HomeContainer';
import RideRequestContainer from './RideRequest/container/RideRequestContainer';
import PickUpContainer from './PickUp/container/PickUpContainer';
import DropOffContainer from './DropOff/container/DropOffContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AlertContainer from './Alert/container/AlertContainer'

//Drawer Imports
import Menu from '../routes/Menu/container/MenuContainer';
import Drawer1 from '../Components/Drawer1';
import Drawer2 from '../Components/Drawer2';
import HeaderComponent from '../Components/HeaderComponent';
import CreateProfile from './Login/components/CreateProfile/';
import ProfileContainer from './Profile/container/ProfileContainer';
import LoaderComponent from '../Components/loader';


const MenuIcon = () => {
    return(
        <Icon name='user-circle-o' size={30} color="green"/>
    )
}

const scenes = Actions.create(
    <Scene key='root' hideNavBar>
        
        <Scene key="login" component={LoginContainer}   initial title="login"/>
        <Scene key="createProfile" component={CreateProfile}  title="Create Profile"/>
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
            <Scene key="profile" component={ProfileContainer}  title="Profile"/>
        </Drawer>
        <Scene key="alert" component={AlertContainer} title="alert"/>




    </Scene>
);

export default scenes;