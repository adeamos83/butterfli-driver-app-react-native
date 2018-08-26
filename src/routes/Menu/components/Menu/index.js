import React from 'react';
import { View, Text, Image } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './MenuStyles';

export const MenuContainer =({ unAuthUser, authUser, user_id, driverInfo, currentRoute, prevRoute }) => {
   const { profilePic } = driverInfo || {};

   onlogOut = () =>{
      console.log("logging out")
      // unAuthUser();
      // unAuthUser();
      Actions.login({type: "reset"});
   }

   startTrip = () => {
      if(currentRoute !== '_profile'){
         Actions.drawerClose();
      } else {
         Actions[prevRoute.slice(1)].call({type: 'replace'})
      }
   }


   return(
      <View style={{flex: 1}}>
         <View style={{flex: 1, backgroundColor: '#BE90D4', justifyContent: 'center', alignItems: 'center'}}>
         { profilePic && 
            <Image resizemode="container" style={styles.driverPic} source={{uri:profilePic}} />
            ||
            <Icon name="user-circle-o" style={styles.icon} />
         }
         </View>
         <View style={{flex: 2}}>
            <Content>
               <List>
                  <ListItem onPress={this.startTrip}>
                     <Text style={{fontSize: 16}}>Start a trip</Text>
                  </ListItem>
                  <ListItem onPress={() => Actions.profile({type: 'replace'})}>
                     <Text style={{fontSize: 16}}>Profile</Text>
                  </ListItem>
                  <ListItem onPress={this.onlogOut}>
                     <Text style={{fontSize: 16}}>Log Out</Text>
                  </ListItem>
               </List>
            </Content>
         </View>
      </View>
   )
}

export default MenuContainer;