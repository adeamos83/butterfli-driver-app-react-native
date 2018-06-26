import React from 'react';
import { Text } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './FooterComponentStyles';


export const FooterComponent = () => {

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
                {
                    tabs.map((obj, index) => {
                        return (
                            <Button key={index}>
                                <Icon size={20} name={obj.icon} style={{color: (index === 0) ? "orange" : "black"}}/>
                                <Text style={{fontSize: 12, color: (index === 0) ? "orange" : "red"}}>{obj.title}</Text>
                                <Text style={styles.subText}>{obj.subTitle}</Text>
                            </Button>
                        )
                    })
                }
                
            </FooterTab>
            </Footer>
    );
}

export default FooterComponent;