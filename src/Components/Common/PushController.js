import React, { Component } from 'react';
import PushNotifications from 'react-native-push-notification';

class PushController extends Component {
   componentDidMount(){
      PushNotifications.configure({
         onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );
         },
      })
   }

   render() {
      return null;
   }
}

export { PushController };
