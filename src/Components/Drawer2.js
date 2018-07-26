import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

class Drawer2 extends React.Component{

   render(){
      return(
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Drawer 2</Text>
         </View>
      )
   }
}

export default Drawer2;