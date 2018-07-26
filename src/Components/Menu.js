import React from 'react';
import { View, Text } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

class Menu extends React.Component{

   render(){
      return(
         <View style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: '#2c3e50', justifyContent: 'center', alignItems: 'center'}}>

            </View>
            <View style={{flex: 2}}>
               <Content>
                  <List>
                     <ListItem>
                        <Text>Menu 1</Text>
                     </ListItem>
                     <ListItem>
                        <Text>Menu 2</Text>
                     </ListItem>
                  </List>
               </Content>
            </View>
         </View>
      )
   }
}

export default Menu;