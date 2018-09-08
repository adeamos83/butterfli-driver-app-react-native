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
import { unAuthUser } from '../routes/Login/modules/login'
import { getAppState } from '../routes/Home/modules/home';

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
        BackgroundGeolocation.on('location', this.onLocation, this.onError);
    
        // This handler fires when movement states changes (stationary->moving; moving->stationary)
        BackgroundGeolocation.on('motionchange', this.onMotionChange);
    
        // This event fires when a change in motion activity is detected
        BackgroundGeolocation.on('activitychange', this.onActivityChange);
    
        // This event fires when the user toggles location-services authorization
        BackgroundGeolocation.on('providerchange', this.onProviderChange);
    
        ////
        // 2.  Execute #ready method (required)
        //
        BackgroundGeolocation.ready({
          // Geolocation Config
          desiredAccuracy: 1000,
          distanceFilter: 0,
          // Activity Recognition
          stopTimeout: 5,
          // Application config
          debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
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
        
    }
    
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        BackgroundGeolocation.removeListeners();
        console.log("Componenet is unmounting")
        
    }

    onLocation(location) {
        console.log('- [event] location: ', location);
        
        if(this.state.appState === 'background'){
            PushNotifications.localNotification({
                message: location,
            });
        }
    }
    onError(error) {
        console.warn('- [event] location error ', error);
    }
    onActivityChange(activity) {
        console.log('- [event] activitychange: ', activity);  // eg: 'on_foot', 'still', 'in_vehicle'
    }
    onProviderChange(provider) {
        console.log('- [event] providerchange: ', provider);    
    }
    onMotionChange(location) {
        console.log('- [event] motionchange: ', location.isMoving, location);
    }

    _handleAppStateChange = (nextAppState) => {
        console.log("This is the Next App State: ", nextAppState);
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState});
        store.dispatch(getAppState(nextAppState));

        if(this.state.appState === 'background'){
            let date = new Date(Date.now() + (6 * 1000));
            PushNotifications.localNotificationSchedule({
                message: "My notification message",
                date: date, 
            });
        }
    }

    onBeforeLift = () => {
        // take some action right before Rehydrate
        // JWT token has expired User need to login
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
                        
                        <Router scenes={scenes} />
                        <AlertContainer />
                        <PushController />
                    </View>
                </PersistGate>
            </Provider>
        );
    }
}
    