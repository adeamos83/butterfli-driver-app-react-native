import React from 'react';
import { Text, Image } from 'react-native';
import { Actions, Scene, Drawer } from 'react-native-router-flux';

import { Header, Left, Body, Right, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './HeaderComponentStyles';

const buttefliLogo = require("../../Assets/img/butterfli_name_logo.png");

export const HeaderComponent = () => {
    return (
        <Header style={{backgroundColor: "#DCC6E0"}} iosBarStyle="light-content">
            <Left>
                <Button transparent onPress={() => Actions.drawerOpen()}>
                    <Icon name="user-circle-o" style={styles.icon} />>
                </Button>
            </Left>
            <Body>
                <Image resizeMode="contain" style={styles.logo} source={buttefliLogo} />
            </Body>
            <Right>
            </Right>
        </Header>
    );
}

export default HeaderComponent;