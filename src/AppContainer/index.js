import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import BackgroundGeolocation from "react-native-background-geolocation";
import { Router } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/integration/react'
import scenes from '../routes/scenes';
import { View, AppState, ActivityIndicator, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Alert from '../routes/Alert/components/alerts'
import AlertContainer from '../routes/Alert/container/AlertContainer'
import styles from './AppContainerStyle';
var Spinner = require('react-native-spinkit');
import PushNotifications from 'react-native-push-notification';
import { Provider } from 'react-redux';

import configureStore from '../store/createStore';
const { store, persistor } = configureStore();
import { addAlert } from '../routes/Alert/modules/alerts';
import { unAuthUser } from '../routes/Login/modules/login';
import { pickUpArrivingAlerted } from '../routes/PickUp/modules/pickUp';
import { dropOffArrivingAlerted } from '../routes/DropOff/modules/dropOff';
import { getAppState, newBookingAlerted, watchingDriverLocation } from '../routes/Home/modules/home';
import { getLatLonDiffInMeters } from '../util/helper';

var Spinner = require('react-native-spinkit');
import { PushController } from '../Components/Common';
export default class AppContainer extends Component {
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false
        this.state = {
            appState:AppState.currentState
        }
    }

    componentWillMount() {
        ////
        // 1.  Wire up event-listeners
        //
    
        // This handler fires whenever bgGeo receives a location update.
        // BackgroundGeolocation.on('location', this.onLocation, this.onError);
    
        // This handler fires when movement states changes (stationary->moving; moving->stationary)
        // BackgroundGeolocation.on('motionchange', this.onMotionChange);
    
        // // This event fires when a change in motion activity is detected
        // BackgroundGeolocation.on('activitychange', this.onActivityChange);
    
        // This event fires when the user toggles location-services authorization
        // BackgroundGeolocation.on('providerchange', this.onProviderChange);
    
        ////
        // 2.  Execute #ready method (required)
        //
        BackgroundGeolocation.ready({
          // Geolocation Config
          reset: true,
          desiredAccuracy: 1000,
          distanceFilter: 0,
          preventSuspend: true,
          heartbeatInterval: 10,
          // Activity Recognition
          stopTimeout: 5,
          // Application config
          debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
          logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
          stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
          startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
          // HTTP / SQLite config
        //   url: 'http://yourserver.com/locations',
        //   batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
        //   autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
        //   headers: {              // <-- Optional HTTP headers
        //     "X-FOO": "bar"
        //   },
        //   params: {               // <-- Optional HTTP params
        //     "auth_token": "maybe_your_server_authenticates_via_token_YES?"
        //   }
        }, (state) => {
          console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
    
          if (!state.enabled) {
            ////
            // 3. Start tracking!
            //
            BackgroundGeolocation.start(function() {
              console.log("- Start success");
            });
          }
        });
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        console.log("This is the component did mount App ");
        console.log("This is the current App State: ", this.state.appState);

        console.log("Expiration date for user", store.getState().login.expDate);
        // take some action right before Rehydrate
        // JWT token has expired User need to login
        var dateNow = new Date();
        if (store.getState().login.expDate < (dateNow.getTime() / 1000)){
            console.log("JWT token has expired User need to login");
            store.dispatch(unAuthUser());
            Actions.login({type: "replace"});
            
        }

        // This event fires when a change in motion activity is detected
        // BackgroundGeolocation.on('activitychange', this.onActivityChange);   
        
        BackgroundGeolocation.on('heartbeat', function(params) {
            // var lastKnownLocation = params.location;
            // console.log('- heartbeat: ', lastKnownLocation);
            // Or you could request a new location
            
            if(store.getState().home.bookingDetails && !store.getState().home.newBookingAlert && (store.getState().home.driverStatus == "available")){
                PushNotifications.localNotification({
                    message: "You have a new ride request"
                });
                store.dispatch(newBookingAlerted(true));
            }

            if(store.getState().home.appState !== "active"){
                BackgroundGeolocation.getCurrentPosition(function(location) {
                    console.log('- current position: ', location);
                    console.log("Here is the curent state of the app: ", store.getState().home.appState);
                    // console.log("Alert status: ", store.getState().pickUp.pickUpArrivingAlert);

                    // store.dispatch(watchingDriverLocation(location))

                    if(store.getState().home.bookingDetails){
                        //Background Gelocation Get Current Position
                        const distFrom = getLatLonDiffInMeters(location.coords.latitude, location.coords.longitude,
                        store.getState().home.bookingDetails.pickUp.latitude, store.getState().home.bookingDetails.pickUp.longitude);

                        const dropDistFrom = getLatLonDiffInMeters(location.coords.latitude, location.coords.longitude,
                        store.getState().home.bookingDetails.dropOff.latitude, store.getState().home.bookingDetails.dropOff.longitude);

                        if(store.getState().pickUp.pickUpDistance < 100 && !store.getState().pickUp.pickUpArrivingAlert){
                            var pickUpTime = store.getState().pickUp.distanceFrom.rows[0].elements[0].duration.value
                            var totalTime = (pickUpTime) / 60;

                            PushNotifications.localNotification({
                                message: "Arriving to passenger's pickup location in " + Math.round(totalTime) + " minutes"
                            }); 
                            store.dispatch(pickUpArrivingAlerted(true))
                        }

                        if(store.getState().dropOff.dropOffDistance < 100 && !store.getState().dropOff.dropOffArrivingAlert){
                            var dropOffTime = store.getState().dropOff.distanceFrom.rows[0].elements[0].duration.value;
                            var totalTime = (dropOffTime) / 60;
                        
                            PushNotifications.localNotification({
                                message: "Arriving to passenger's drop off location in " + Math.round(totalTime) + " minutes"
                            }); 
                            store.dispatch(dropOffArrivingAlerted(true))
                        }

                        console.log("Here is the distance from Driver to pick up: ", distFrom);
                    }
                });
            }
        });
    }
    
    componentWillUnmount() {
        console.log("Componenet is unmounting");
        AppState.removeEventListener('change', this._handleAppStateChange);
        BackgroundGeolocation.removeListeners();
        store.dispatch(pickUpArrivingAlerted(false));
        store.dispatch(dropOffArrivingAlerted(false));
        store.dispatch(newBookingAlerted(false));
    }


    _handleAppStateChange = (nextAppState) => {
        console.log("This is the Next App State: ", nextAppState);
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState});
        store.dispatch(getAppState(nextAppState));

        // if(this.state.appState === 'background'){
        //     let date = new Date(Date.now() + (6 * 1000));
        //     PushNotifications.localNotificationSchedule({
        //         message: "My notification message",
        //         date: date, 
        //     });
        // }
    }

    onBeforeLift = () => {
        // take some action right before Rehydrate
        // JWT token has expired User need to login
        console.log("Expiration date for user", store.getState().login.expDate);
        var dateNow = new Date();
        if (store.getState().login.expDate < (dateNow.getTime() / 1000)){
            console.log("JWT token has expired User need to login");
            store.dispatch(unAuthUser());
            Actions.login({type: "replace"});
            
        }
    }


    renderLoading = () => (
        <View style={styles.container}>
            <Image style={styles.headerLogo} source={require('../Assets/img/butterfli_name_logo.png')}/>
            <Spinner isVisible={true} size={50} type="ThreeBounce" color="#8E44AD"/>
            
        </View>
    );

    render() {
        return(
            <Provider store={store}>
                <PersistGate persistor={persistor} onBeforeLift={this.onBeforeLift} loading={this.renderLoading()} >
                    <View style={{flex: 1}}>
                        
                        <Router scenes={scenes}/>
                        <AlertContainer />
                        <PushController />
                    </View>
                </PersistGate>
            </Provider>
        );
    }
}
    