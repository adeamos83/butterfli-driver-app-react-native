import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';
import { API_URL, UPDATE_PROFILE_URL } from '../../../api';
import axios from 'axios';
import { getVehicleGarage, unAuthUser } from '../../Login/modules/login'
import { addAlert } from '../../Alert/modules/alerts';

//-------------------------------
// Constants
//-------------------------------
const { 
    UNAUTH_USER,
    GET_DRIVER_INFORMATION,
    EDITTING_PROFILE,
    USER_PROFILE_UPDATED,
    DRIVER_RIDE_HISTORY,
    UPDATE_VEHICLE_TYPE,
    SELECT_VEHICLE_INFO,
    EDITTING_VEHICLE_PROFILE,
    IS_VEHICLES_LOADING
    } = constants;


//-------------------------------
// Intial Stat
//-------------------------------

const initialState = {
    canEdit: false,
    canEditVehicle: false,
    vehicleLoading: true
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

export function getDriverInfo() {
    return (dispatch, store) => {
        let user_id = store().login.user_id;
        console.log(user_id);
        let id = "5b5d05220fdb907bdb8a5c2d";

        return axios.get(`${API_URL}/api/driver/` + user_id, {
            headers: {authorization: store().login.token}
        }).then((res) => {
            console.log("This is Get Driver Info", res);
            dispatch({
                type: GET_DRIVER_INFORMATION,
                payload: res.data
            });
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
               dispatch(unAuthUser());
               Actions.login({type: 'replace'})
            } else {
               dispatch(addAlert("Could not get Driver Profile."));
            }
        })
        .then(function(){
            dispatch(getVehicleGarage());
        })

    }
}

export function canEditProfile() {
    return(dispatch, store) => {
        dispatch({
            type:EDITTING_PROFILE,
            payload: !store().profile.canEdit
        })
    }
}

export function changeVehicleServiceType(value){
    return(dispatch, store) => {
        newDriver = {
            ...store().profile.driverInfo,
            serviceType: value
        }
        
        dispatch({
            type: UPDATE_VEHICLE_TYPE ,
            payload: newDriver
        })
    }
}

export function updateDriverProfile(firstName, lastName, email, phoneNumber){
    return(dispatch, store) => {
        console.log("Here are the values from the form", arguments);
        console.log("Here are the values from the form", ...arguments);
        var details = {
            // ...store().profile.driverInfo,
            firstName: firstName, 
            lastName: lastName, 
            email: email, 
            phoneNumber: phoneNumber,
            // vehicle: store().profile.selectedVehicle._id
        }
        console.log(details);
        update_Profile_Url = API_URL + "/api/driver/" + store().login.user_id;
        return axios.put(update_Profile_Url, details, {
            headers: {authorization: store().login.token}
        }).then((response) => {
             var details = response.data;
            //  dispatch(addAlert("User Profile Updated"));
             dispatch({
                 type: USER_PROFILE_UPDATED,
                 payload: details
             });
            //  Actions.home({type: "replace"})
            //  dispatch(isSigningUp(false));

        }).catch((error) => {
            // dispatch(addAlert("Could not update Driver Profile."));
            // dispatch(isSigningUp(false));
				console.log(error)
				if (error.response.status === 401) {
					dispatch(unAuthUser());
					Actions.login({type: 'replace'})
			  	}
        });
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
				if (error.response.status === 401) {
					dispatch(unAuthUser());
					Actions.login({type: 'replace'})
			  	} else {
					dispatch(addAlert("Could not get Ride History."));
			  	}
        });
    }
}

export function getSelectedVehicle(payload){
    console.log("this is from the Car Profile", payload);
    return(dispatch, store) => {
        dispatch({
            type:SELECT_VEHICLE_INFO,
            payload: payload
        })
    }
}

// Gathers needed information to send post request to create profile
export function updateVehicleProfile(){
    return(dispatch, store) => {
        var details = {
            ...store().profile.driverInfo,
            vehicle: store().profile.selectedVehicle._id
        }
        console.log("from create profile redux function", details);
        vehicleUpdateUrl = UPDATE_PROFILE_URL + "/" + store().profile.driverInfo._id
        return axios.put(vehicleUpdateUrl, details, {
            headers: {authorization: store().login.token}
        }).then((response) => {
             var details = response.data;
             console.log(details);
             dispatch({
                 type: USER_PROFILE_UPDATED,
                 payload: details
             });
             dispatch({
                type:EDITTING_VEHICLE_PROFILE,
                payload: !store().profile.canEditVehicle
            })
        }).catch((error) => {
            if (error.response.status === 401) {
               dispatch(unAuthUser());
               Actions.login({type: 'replace'})
            } else {
					dispatch(addAlert("Could not create User Profile."));
            }
        });
    }
 }

 export function canEditVehicleProfile() {
    return(dispatch, store) => {
        dispatch({
            type:EDITTING_VEHICLE_PROFILE,
            payload: !store().profile.canEditVehicle
        })
    }
}

// Used for the loading spinner when loading vehicles 
export function isVehiclesLoading(payload){
    return (dispatch) => {
        dispatch({
            type: IS_VEHICLES_LOADING, 
            payload: payload
        })
    }
}


//-------------------------------
// Action Handlers
//-------------------------------

function handleGetDriverInfo(state, action) {
    return update(state, {
        driverInfo: {
            $set: action.payload
        }
    });
}
function handleCanEditProfile(state, action ) {
    return update(state, {
        canEdit: {
            $set: action.payload
        }
    })
}

function handleCanEditVehicleProfile(state, action ) {
    return update(state, {
        canEditVehicle: {
            $set: action.payload
        }
    })
}


function handleChangeServiceType(state, action ) {
    return update(state, {
        driverInfo: {
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
 
 function handleSelectVehicle(state, action){
    return update(state, {
        selectedVehicle: {
            $set: action.payload
        }
    });
}

function handleIsVehiclesLoading(state, action ) {
    return update(state, {
        vehicleLoading: {
            $set: action.payload
        }
    })
}


const ACTION_HANDLERS = {
    GET_DRIVER_INFORMATION: handleGetDriverInfo,
    EDITTING_PROFILE: handleCanEditProfile,
    USER_PROFILE_UPDATED: handleGetDriverInfo,
    UPDATE_VEHICLE_TYPE: handleChangeServiceType,
    DRIVER_RIDE_HISTORY: handleGetRideHistory,
    SELECT_VEHICLE_INFO: handleSelectVehicle,
    EDITTING_VEHICLE_PROFILE: handleCanEditVehicleProfile,
    IS_VEHICLES_LOADING: handleIsVehiclesLoading
}



export function ProfileReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}