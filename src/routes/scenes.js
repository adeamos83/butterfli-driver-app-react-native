import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Actions, ActionConst, Scene, Drawer, Stack, Modal, Overlay, Lightbox } from 'react-native-router-flux';
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
import SelectVehicleContainer from './Login/components/SelectVehicle';
import RideSummary from './DropOff/components/RideSummary';
import RideHistoryContainer from './Profile/components/RideHistory';

import ErrorModal from '../Components/Modal/ErrorModal';
import CustomNavBar from '../Components/Common/CustomNavBar';
import ErrorLightbox from '../Components/LightBox/ErrorLightbox';

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
	<Modal key="modal" hideNavBar>
	<Lightbox key="lightbox">

    <Scene key='root' hideNavBar>
        <Scene key="login" component={LoginContainer} initial title="login" />
        <Scene key="createProfile" component={CreateProfile}   title="Create Profile"/>
        <Scene key="createVehicleProfile" component={CreateVehicleProfile} title="Vehicle Profile"/>
        
        <Stack back backTitle="Back" backButtonTextStyle={styles.backButtonStyle} key="loadVehicle" duration={0} navTransparent>
            <Scene key="loadVehicleSelect" component={SelectVehicleContainer}  title="Select Vehicle"/>
        </Stack>


        <Stack back backTitle="Back" backButtonTextStyle={styles.backButtonStyle} key="register" duration={0} navTransparent>
            <Scene key="createProfile" component={CreateProfile}   title="Sign Up"/>
            <Scene key="createVehicleProfile" component={CreateVehicleProfile} title="Add Vehicle"/>
            <Scene key="login" component={LoginContainer}/> 
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
            <Scene key="home" drawerLockMode='locked-closed' gesturesEnabled={false} component={HomeContainer}/>
            <Scene key="rideRequest"  drawerLockMode='locked-closed' gesturesEnabled={false} component={RideRequestContainer}/>
            <Scene key="pickUp" drawerLockMode='locked-closed' gesturesEnabled={false} component={PickUpContainer}/>
            <Scene key="dropOff" drawerLockMode='locked-closed' gesturesEnabled={false} component={DropOffContainer}/>
            <Scene key="profile" drawerLockMode='locked-closed' gesturesEnabled={false} component={ProfileContainer}  title="Profile"/>
            <Scene key="vehicleSelect" drawerLockMode='locked-closed' gesturesEnabled={false} component={SelectVehicleContainer}  title="Select Vehicle"/>
            <Scene key="rideHistory" drawerLockMode='locked-closed' gesturesEnabled={false} component={RideHistoryContainer} title="Ride History"/>
            <Scene key="rideSummary" drawerLockMode='locked-closed' gesturesEnabled={false}component={RideSummary} title="Ride Summary"/>
		  </Drawer>
		  <Scene key="error" component={ErrorModal} />
        <Scene key="alert" component={AlertContainer} title="alert"/>
	 </Scene>
	 <Scene key="error_modal" component={ErrorLightbox} />
	 </Lightbox>
	 </Modal>
);

export default scenes;