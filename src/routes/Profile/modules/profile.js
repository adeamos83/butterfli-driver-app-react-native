import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';
import { API_URL } from '../../../api';
import axios from 'axios';

import { addAlert } from '../../Alert/modules/alerts';

//-------------------------------
// Constants
//-------------------------------
const { 
    UNAUTH_USER,
    DRIVER_RIDE_HISTORY,
    UPDATE_VEHICLE_TYPE       
    } = constants;


//-------------------------------
// Intial Stat
//-------------------------------

const initialState = {
    
};



//-------------------------------
// Action
//-------------------------------

export function authUser(user_id){
   return(dispatch) => {
       dispatch({
           type: AUTH_USER,
           payload: user_id
       });
   }
}

export function changeVehcileType(value){
    return(dispatch, store) => {
        newDriver = {
            ...store().home.driverInfo,
            vehicleType: value
        }
        console.log("Vehicle Info: ", store().home.driverInfo.vehicle)
        dispatch({
            type: UPDATE_VEHICLE_TYPE ,
            payload: newDriver
        })
    }
}

export function getRideHistory(){
    return(dispatch, store) => {
        const driverId = store().login.user_id
        const rideHistoryUrl = API_URL + "/api/driver/" + driverId + "/bookings";
        console.log(rideHistoryUrl);
        return axios.get(rideHistoryUrl, {
            headers: {authorization: store().login.token}
        }).then((response) => {
             var rideHistory = response.data;
             console.log(rideHistory);
             dispatch({
                 type: DRIVER_RIDE_HISTORY,
                 payload: rideHistory
             });
        }).catch((error) => {  
            console.log(error); 
            dispatch(addAlert("Could not get Ride History."));
        });
    }
}

//-------------------------------
// Action Handlers
//-------------------------------

function handleChangeVehicleType(state, action ) {
    return update(state, {
        updatedDriverInfo: {
            $set: action.payload
        }
    })
}

function handleGetRideHistory(state, action ) {
    return update(state, {
        rideHistory: {
            $set: action.payload
        }
    })
}


const ACTION_HANDLERS = {
    UPDATE_VEHICLE_TYPE: handleChangeVehicleType,
    DRIVER_RIDE_HISTORY: handleGetRideHistory
}



export function ProfileReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}