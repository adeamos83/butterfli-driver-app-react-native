import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './InRouteFooterStyles';


export const InRouteFooter = ({openMapsRoute}) => {

    // Footer bar items
    const tabs = [{
        title: "ButterFLi",
        subTitle: "",
        icon: "car"
    },
    {
        title: "ButterFLi XL",
        subTitle: "",
        icon: "car"
    },
    {
        title: "ButterFLi LUX",
        subTitle: "",
        icon: "car"
    }]

    return (
        <Footer>
            <FooterTab style={styles.footerContainer} iosBarStyle="light-content">
                return (
                    <View style={styles.buttonContainer}>
                        <Button success style={styles.navButton} onPress={() => openMapsRoute("pick up")}>
                            <Text style={styles.btnText}>Start Navigation</Text>
                        </Button>
                    </View>
                   
                )
            </FooterTab>
            </Footer>
    );
}

export default InRouteFooter;