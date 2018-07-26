import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

class Drawer1 extends React.Component{

   render(){
      return(
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Drawer 1</Text>
         </View>
      )
   }
}

export default Drawer1;