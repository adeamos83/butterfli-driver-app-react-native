import React from 'react';
import { View, Text } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';


export const MenuContainer =({ unAuthUser, authUser, user_id }) => {

   onlogOut = () =>{
      console.log("logging out")
      console.log(this.props);
      unAuthUser();
      Actions.login({type: "reset"});
   }

   return(
      <View style={{flex: 1}}>
         <View style={{flex: 1, backgroundColor: '#2c3e50', justifyContent: 'center', alignItems: 'center'}}>

         </View>
         <View style={{flex: 2}}>
            <Content>
               <List>
                  <ListItem>
                     <Text>Profile</Text>
                  </ListItem>
                  <ListItem onPress={this.onlogOut}>
                     <Text>Log Out</Text>
                  </ListItem>
               </List>
            </Content>
         </View>
      </View>
   )
}

export default MenuContainer;