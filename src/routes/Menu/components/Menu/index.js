import React from 'react';
import { View, Text, Image } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './MenuStyles';

const menuLogo = require('../../../../Assets/img/Menu-Drawer-Logo-76x76.png');

export const MenuContainer =({ unAuthUser, newBookingAlerted, pickUpArrivingAlerted, driverStatus, dropOffArrivingAlerted,
   getDriverStatus, authUser, user_id, driverInfo, currentRoute, prevRoute, cancelBookingRequest }) => {
   const { profilePic, firstName, lastName, vehicle } = driverInfo || "";
   const { company } = driverInfo || {};
   const { serviceType } = vehicle || "";

   
   // const capServiceType = serviceType[0].toUpperCase() + serviceType.slice(1) || "";
   Capitalize= (str) => { 
      if(str){
         return str[0].toUpperCase() + str.slice(1) || "";
      }
   }

   onlogOut = () => {
      console.log("logging out")
      unAuthUser();
      Actions.login({type: "replace"});
   }

   onCancelTrip = () => {
      cancelBookingRequest();
      newBookingAlerted(false);
      pickUpArrivingAlerted(false);
      dropOffArrivingAlerted(false);
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
         <View style={styles.avatarView}>
            <View style={{paddingRight: 15}}>  
                  { profilePic && 
                  <Image resizemode="container" style={styles.driverPic} source={{uri: profilePic}} />
                  ||
                  <Image resizemode="container" style={styles.logo} source={menuLogo} />
                  }
            </View>
            { driverInfo.company &&
                  <View>
                  <Text style={styles.avatarTextHeader}>{firstName + " " + lastName}</Text>
                  
                        <Text style={styles.avatarText}>{company.company}</Text>
                        <Text style={styles.avatarText}>{"Service: " + this.Capitalize(serviceType)}</Text>
                  
                  </View>
            }
         </View>
         <View style={{flex: 4}}>
            <Content>
               <List>
                  <ListItem onPress={this.startTrip}>
                     <Text style={{fontSize: 16}}>{(driverStatus == "notAvailable" || driverStatus == "available")? "Home" : "Back to Trip"}</Text>
                  </ListItem>
                  { (driverStatus !== "notAvailable" && driverStatus !== "available") && 
                     <ListItem onPress={this.onCancelTrip}>
                        <Text style={{fontSize: 16, paddingLeft: 20, color: 'red'}}>Cancel Trip</Text>
                     </ListItem>
                  }
                  <ListItem onPress={() => Actions.profile({type: 'replace'})}>
                     <Text style={{fontSize: 16}}>Profile</Text>
                  </ListItem>
                  <ListItem onPress={() => Actions.vehicleSelect({type: 'replace'})}>
                     <Text style={{fontSize: 16}}>Vehicle</Text>
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