import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { Router } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/integration/react'
import scenes from '../routes/scenes';
import { View, AppState, ActivityIndicator, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Alert from '../routes/Alert/components/alerts'
import AlertContainer from '../routes/Alert/container/AlertContainer'
import styles from './AppContainerStyle';
var Spinner = require('react-native-spinkit');

import { Provider } from 'react-redux';

import configureStore from '../store/createStore';
const { store, persistor } = configureStore();
import { unAuthUser } from '../routes/Login/modules/login'
import { getAppState } from '../routes/Home/modules/home';

var Spinner = require('react-native-spinkit');

export default class AppContainer extends Component {
    // static propTypes = {
    //     store: PropTypes.object.isRequired,
    //     persistor: PropTypes.object.isRequired,
    // }
    constructor(props) {
        super(props);
        Text.defaultProps.allowFontScaling=false
        this.state = {
            appState:AppState.currentState
        }
    }
    // state = {
    //     appState: AppState.currentState
    // }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        console.log("This is the component did mount App ");
        
    }
    
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        console.log("Componenet is unmounting")
    }

    _handleAppStateChange = (nextAppState) => {
        console.log("This is the Next App State: ", nextAppState);
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState});
        store.dispatch(getAppState(nextAppState));
    }

    onBeforeLift = () => {
        // take some action before the gate lifts
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
                    </View>
                </PersistGate>
            </Provider>
        );
    }
}
    