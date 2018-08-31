import React from 'react';
import { View, Text, Image } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './MenuStyles';

export const MenuContainer =({ unAuthUser, driverStatus, getDriverStatus, authUser, user_id, driverInfo, currentRoute, prevRoute, cancelBookingRequest }) => {
   const { profilePic } = driverInfo || {};

   onlogOut = () => {
      console.log("logging out")
      unAuthUser();
      Actions.login({type: "reset", loggingOut: true});
   }

   onCancelTrip = () => {
      cancelBookingRequest();
      getDriverStatus("available");
      Actions.home({type: "replace"});
   }

   startTrip = () => {
      // if(currentRoute !== '_profile'){
      //    Actions.drawerClose();
      //    console.log('drawer is closing')
      // } else {
      //    console.log(prevRoute);
      //    Actions[prevRoute.slice(1)].call({type: 'replace'})
      // }
      if(driverStatus == "notAvailable" || driverStatus == "available"){
         console.log("need to route home")
         Actions.home({type: "replace"});
      } else if( driverStatus == "enRoute"){
         console.log("need to route ride request")
         Actions.rideRequest({type: "replace"});
      } else if (driverStatus == "pickUp") {
         console.log("need to route pick up")
         Actions.pickUp({type: "replace"});
      } else if( driverStatus == "dropOff") {
         console.log("need to route drop off")
         Actions.dropOff({type: "replace"});
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
                     <Text style={{fontSize: 16}}>{(driverStatus == "notAvailable" || driverStatus == "available")? "Start Trip" : "Back to Trip"}</Text>
                  </ListItem>
                  { (driverStatus !== "notAvailable" && driverStatus !== "available") && 
                     <ListItem onPress={this.onCancelTrip}>
                        <Text style={{fontSize: 16, paddingLeft: 20, color: 'red'}}>Cancel Trip</Text>
                     </ListItem>
                  }
                  <ListItem onPress={() => Actions.profile({type: 'replace'})}>
                     <Text style={{fontSize: 16}}>Profile</Text>
                  </ListItem>
                  <ListItem onPress={() => Actions.rideHistory({type: 'replace'})}>
                     <Text style={{fontSize: 16}}>Ride History</Text>
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