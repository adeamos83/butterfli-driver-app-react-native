import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Actions, ActionConst, Scene, Drawer, Stack, Modal, Overlay } from 'react-native-router-flux';
import LoginContainer from './Login/container/LoginContainer';
import HomeContainer from './Home/container/HomeContainer';
import RideRequestContainer from './RideRequest/container/RideRequestContainer';
import PickUpContainer from './PickUp/container/PickUpContainer';
import DropOffContainer from './DropOff/container/DropOffContainer';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertContainer from './Alert/container/AlertContainer'

//Drawer Imports
import Menu from '../routes/Menu/container/MenuContainer';
import HeaderComponent from '../Components/HeaderComponent';
import CreateProfile from './Login/components/CreateProfile/';
import CreateVehicleProfile from './Login/components/VehicleProfile';
import ProfileContainer from './Profile/container/ProfileContainer';

import RideSummary from './DropOff/components/RideSummary';
import RideHistoryContainer from './Profile/components/RideHistory';



const MenuIcon = () => {
    return(
        <Icon name='user-circle-o' size={30} color="green"/>
    )
}

const drawerMenuIcon = () => {
    return(
        <Icon name="bars" size={25} color= "#fff"/>
    )
}

const styles = StyleSheet.create({
    backButtonStyle: {
      paddingLeft: 10,
    }
  });

const scenes = Actions.create(
    <Scene key='root' hideNavBar>
        <Scene key="login" component={LoginContainer} initial title="login"/>
        <Scene key="createProfile" component={CreateProfile}   title="Create Profile"/>
        <Scene key="createVehicleProfile" component={CreateVehicleProfile} title="Vehicle Profile"/>

        <Stack back backTitle="Back" backButtonTextStyle={styles.backButtonStyle} key="register" duration={0} navTransparent>
            <Scene key="createProfile" component={CreateProfile}   title="Sign Up"/>
            <Scene key="createVehicleProfile" component={CreateVehicleProfile} title="Add Vehicle"/>
            <Scene key="login" component={LoginContainer} title="Replace" type={ActionConst.REPLACE} /> 
        </Stack>

        <Drawer 
            key="drawer"
            contentComponent={Menu}
            drawerWidth={250}
            drawerIcon={<Icon name="bars" size={25} color= "#000"/>}
            drawer={true}
            hideNavBar
            navigationBarStyle={{
                position: 'absolute',
                backgroundColor: 'transparent',
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0,
                borderBottomWidth: 0,
                elevation: 0,
            }}
        >
            <Scene key="home" component={HomeContainer}/>
            <Scene key="rideRequest" component={RideRequestContainer}/>
            <Scene key="pickUp" component={PickUpContainer}/>
            <Scene key="dropOff" component={DropOffContainer}/>
            <Scene key="profile" component={ProfileContainer}  title="Profile"/>
            <Scene key="rideHistory" component={RideHistoryContainer} title="Ride History"/>
            <Scene key="rideSummary" component={RideSummary}    title="Ride Summary"/>
        </Drawer>
        <Scene key="alert" component={AlertContainer} title="alert"/>
    </Scene>
);

export default scenes;