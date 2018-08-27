import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { Router } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/integration/react'
import scenes from '../routes/scenes';
import { View, AppState, ActivityIndicator } from 'react-native';
import Alert from '../routes/Alert/components/alerts'
import AlertContainer from '../routes/Alert/container/AlertContainer'

import { Provider } from 'react-redux';

import configureStore from '../store/createStore';
const { store, persistor } = configureStore();

import { getAppState, testingSomething } from '../routes/Home/modules/home';
export default class AppContainer extends Component {
    // static propTypes = {
    //     store: PropTypes.object.isRequired,
    //     persistor: PropTypes.object.isRequired,
    // }
    state = {
        appState: AppState.currentState
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        console.log("This is the component did mount App ")
    }
    
    componentDidUpdate(prevProps, prevState) {
            console.log("this user is true or false", this.props.driverSocketId  !== prevProps.driverSocketId)    
            if((this.props.driverSocketId  !== prevProps.driverSocketId) && this.props.user_id) {
                console.log("this user is true or false", this.props.driverSocketId  !== prevProps.driverSocketId)
                console.log("this user is true or false", this.props.user_id)
                // this.props.postDriverLocation();
            }
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
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
        console.log("take some action before the gate lifts")
        // store.dispatch(testingSomething());
    } 
    renderLoading = () => (
        <View styles={{flex: 1, justifyContent: "Center"}}>
            <ActivityIndicator size="large"/>
        </View>
    );

    render() {
        return(
            <Provider store={store}>
                <PersistGate persistor={persistor} onBeforeLift={this.onBeforeLift()} loading={this.renderLoading()} >
                    <View style={{flex: 1}}>
                        <Router scenes={scenes} />
                        <AlertContainer />
                    </View>
                </PersistGate>
            </Provider>
        );
    }
}
    