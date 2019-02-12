
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { API_CHECKSTATUS_URL} from '../api';

export function errorLog(err){
   console.log("******====  Errors ====******")
   console.log(err);
   console.log("******========================******");

   // if (err.response) {
   //       // The request was made and the server responded with a status code
   //       console.log("Error Data: ", err.response.data);
   //       console.log("Status: ", err.response.status);
   //       console.log("Error Headers: ", err.response.headers);
   // } else if (error.request) {
   //       // The request was made but no response was received
   //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
   //       // http.ClientRequest in node.js
   // console.log("Error Request: ", err.request);
   // } else {
   //       // Something happened in setting up the request that triggered an Error
   //       console.log('Error Message:', err.message);
   // }
   // console.log("Error Config: ", err.config);
   // console.log("******========================******");
}

export function unAuthUserRes(res){
   if (res.response.status === 401) {
      unAuthUser();
      Actions.login({type: 'replace'});
      Actions.error_modal({data: "Please login back in to refresh your credentials."});
  }
}

// This function checks to make sure the app can communication with the server
export function checkServerStatus(){
   axios.get(API_CHECKSTATUS_URL)
   .then(function(response){
      console.log("Check Status data: ", response.data);
      console.log("Check Status status: ", response.status);
      if(response.status >= 200 && response.status < 300 || response.status === 304){
          console.log("Server connection exists!")
      } else {
          Actions.error_modal({data: "Could't connect. Check your internet connection and try again."})
      }
  })
  .catch(function(error){
      Actions.error_modal({data: "Could't connect. Check your internet connection and try again."})
      errorLog(error);
  })
}