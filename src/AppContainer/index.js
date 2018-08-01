import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { Router } from 'react-native-router-flux';
import scenes from '../routes/scenes';
import { View } from 'react-native';
import Alert from '../routes/Alert/components/alerts'
import AlertContainer from '../routes/Alert/container/AlertContainer'

import { Provider } from 'react-redux';


export default class AppContainer extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    }


    render() {
        return(
            <Provider store={this.props.store}>
                <View style={{flex: 1}}>
                    <Router scenes={scenes} />
                    <AlertContainer />
                </View>

            </Provider>
        );
    }
}
    