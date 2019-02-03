import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';

import uuid from 'uuid';
import axios from 'axios';

import {SIGNIN_URL, FORGOT_PASSWORD_URL, DRIVER_SIGNIN_URL, SIGNUP_URL, API_URL, CREATE_PROFILE_URL} from '../../../api';
import {addAlert} from '../../Alert/modules/alerts';
import { disconnectSocketIO, updateBookingDetails, updateDriverLocationDetails, getDriverStatus } from '../../Home/modules/home';
import { isVehiclesLoading, clearVehicleProfile, getSelectedVehicle, getDriverInfo } from '../../Profile/modules/profile';

//-------------------------------
// Constants
//-------------------------------
const { AUTH_USER,
        UNAUTH_USER,
        CREATE_USER_PROFILE,
        CREATE_VEHICLE_PROFILE,
        NEEDS_PROFILE,
        GET_INPUT,
        NAV_TO_CAR_PROFILE,
        IS_LOGGING_IN,
        IS_SIGNING_UP,
        GET_DRIVER_INFORMATION,
        USER_PROFILE_CREATED,
        CLEAR_PROFILE,
        VEHICLE_GARAGE,
        IS_LOADING,
        PASSWORD_RESET_MESSAGE,
        CLEAR_PASSWORD_RESET_MESSAGE
        } = constants;

//-------------------------------
// Intial State
//-------------------------------

const initialState = {
    alerts:[],
    needsProfile: false,
    inputData: {},
    navToCarPage: false,
    loggingIn: false,
    signingUp: false,
    isLoading: false
};



//-------------------------------
// Action
//-------------------------------

// Used for the spinning loading Sign In button 
export function isLoggingIn(payload){
    return (dispatch) => {
        dispatch({
            type: IS_LOGGING_IN,
            payload: payload
        })
    }
}

// Used for the general spinning loading 
export function isLoading(payload){
    return (dispatch) => {
        dispatch({
            type: IS_LOADING,
            payload: payload
        })
    }
}

// Used for the spinning loading Sign Up button 
export function isSigningUp(payload){
    return (dispatch) => {
        dispatch({
            type: IS_SIGNING_UP,
            payload: payload
        })
    }
}


// Get User Input
export function getInputData(payload) {
    return{
        type: GET_INPUT,
        payload
    }
}

// Handle Post Request to login user
export function loginUser(email, password){
   return(dispatch, store) => {
       return axios.post(DRIVER_SIGNIN_URL, {email, password}).then((response) => {
           console.log("Here is the response from login: ", response);
            var {user_id, token, isProfileCreated, expDate} = response.data;
            var userDetails = {
                user_id: user_id,
                email: email,
                token: token,
                expDate: expDate
            }
            dispatch({
                type: AUTH_USER,
                payload: userDetails
            });
            dispatch(isLoggingIn(false));
            // Actions.vehicleSelect({type: "replace"})
       }).catch((error) => {
        dispatch(isLoggingIn(false));
        Actions.error_modal({data: "Could not log in. Please check username/password"})
        // dispatch(addAlert("Could not log in"));

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
        console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
            console.log(error.config);
        })
        .then( async function(){
            // dispatch(getDriverInfo());
            if(store().login.user_id){
                let user_id = store().login.user_id;
                await axios.get(`${API_URL}/api/driver/` + user_id, {
                headers: {authorization: "bearer " + store().login.token}
                }).then((res) => {
                    console.log("This is Get Driver Info", res);
                    dispatch({
                        type: GET_DRIVER_INFORMATION,
                        payload: res.data
                    });
                }).catch((error) => {
                    console.log(error);
                //  if (error.response.status === 401) {
                //  dispatch(unAuthUser());
                //  Actions.login({type: 'replace'})
                //  } else {
                //  dispatch(addAlert("Could not get Driver Profile."));
                //  }
                })
            }
        })
        .then(function(){
            if(store().login.user_id){
                const { vehicle } = store().driverInfo || {};
                
                console.log("Vehcile info boolean: ", vehicle);
                if(vehicle){
                    dispatch(getSelectedVehicle(store().login.driverInfo.vehicle));
                    Actions.home({type: "replace"})
                } else {
                    Actions.vehicleSelect({type: "replace"})
                }
            }
        })
   }
}

// Handle Post Request to create a User account and profile
export function signupUser(){
    return(dispatch, store) => {
        let userProfile= {
            ...store().login.userProfile,
            vehicle: {
                ...store().login.vehicleProfile
            }
        }
        console.log("This is the  user profile", userProfile);
        return axios.post(SIGNUP_URL, userProfile).then((response) => {
            console.log("this is the response", response);
             var {user_id, token, email, expDate} = response.data;
             var userDetails = {
                user_id: user_id,
                email: email,
                token: token,
                expDate: expDate,
            }
            console.log("This is the user detaials", userDetails);
             dispatch({
                 type: AUTH_USER,
                 payload: userDetails
             });
             setTimeout(function(){
                dispatch(isSigningUp(false));
             }, 3000)
             Actions.home({type: "replace"})
        }).catch((error) => {
            console.log(error.response)
                // if (error.response.status === 422) {
                //     // dispatch(addAlert(error.response.data.error));
                //     Actions.error_modal({data: error.response.data.error})

                // } else {
                //     // dispatch(addAlert("Could not sign up."));
                //     Actions.error_modal({data: "Could not sign up. Please check information and try again."})
                // }
                Actions.error_modal({data: "Could not sign up. Please check information and try again."})
         	setTimeout(function(){
            dispatch(isSigningUp(false));
         }, 3000)
        });
    }
 }
 // Gets Authorized User creditonals to store in state
export function authUser(user_id){
    return(dispatch) => {
        dispatch({
            type: AUTH_USER,
            payload: user_id
        });
    }
 }

// Logs out user, remove user creditionals from state, and updates booking that ride has been canceled if driver is on a ride on the time of logout
export function unAuthUser(){
    return(dispatch, store) => {
        if(store().home.driverStatus !== "available" && store().home.driverStatus !== "notAvailable"){ 
            console.log("Driver is canceling ride request");
            dispatch(updateBookingDetails("rideRequestStatus", "canceled"));
        }

        if(store().profile.selectedVehicle){
            console.log("Clearing vehicle selection")
            dispatch(clearVehicleProfile());
            dispatch(getSelectedVehicle(null));
        }
        if(store().home.driverLocation){
            dispatch(getDriverStatus("notAvailable"));
            
            // THis is probable not need since we are deleting the driver locations one they are logged out.
            // dispatch(updateDriverLocationDetails("driverStatus", "notAvailable"));
        }
        disconnectSocketIO();
        dispatch({
            type: UNAUTH_USER,
        });
    }
}

// Forget password reset form
export function resetPassword(email){
    console.log(email);
    return(dispatch) => {
        let forgotEmail = {
            email: email
        }
        dispatch(isLoading(true));
        console.log("reseting password")
        return axios.post(FORGOT_PASSWORD_URL, forgotEmail).then((response) => {
            console.log(response);
            let message = {
                statusCode: response.status,
                message: response.data
            }
            dispatch(isLoading(false));
            dispatch({
                type: PASSWORD_RESET_MESSAGE,
                payload: message
            })
        })
        .catch((err) => {
            console.log(err)
            dispatch(isLoading(false));
            if(err.response.status = 422){
                Actions.error_modal({data: err.response.data.error});
            }
        });
    }
}

export function clearResetPassword(){
    return(dispatch)=>{
        dispatch({
            type: CLEAR_PASSWORD_RESET_MESSAGE,
            payload: undefined
        })
    }
}

//Check to see if User need to create profile 
export function needsToCreateProfile(payload){
    return(dispatch) => {
        dispatch({
            type: NEEDS_PROFILE,
            payload: payload
        });
    }
}

export function clearCreateProfile(payload){
    return(dispatch) => {
        dispatch({
            type: CLEAR_PROFILE,
            payload: payload
        });
    }
}


// Gathers needed information to send post request to create profile
export function createProfile(){
    return(dispatch, store) => {
        var details = {
            user_id: store().login.user_id,
            email: store().login.email,
            ...store().login.userProfile,
            vehicle: {
                ...store().login.vehicleProfile
            }
        }
        console.log("from create profile redux function", details);

        return axios.post(CREATE_PROFILE_URL, details, {
            headers: {authorization: "bearer " + store().login.token}
        }).then((response) => {
             var details = response.data;
             console.log(details);
            //  dispatch(addAlert("User Profile Created"));
             Actions.error_modal({data: "Your user profile has been created."})
             dispatch({
                 type: USER_PROFILE_CREATED,
                 payload: details
             });
             Actions.home({type: "replace"})
             dispatch(isSigningUp(false));

        }).catch((error) => {
            // dispatch(addAlert("Could not create User Profile."));
            Actions.error_modal({data: "Could not create your user profile. Please check information and try again."})
            dispatch(isSigningUp(false));
        });
    }
 }
 
 export function createCarProfile(payload){
    console.log("this is from the Car Profile", payload);
    return(dispatch, store) => {
        dispatch({
            type:CREATE_VEHICLE_PROFILE,
            payload: payload
        })
    }
 }

 export function createUserProfile(payload){
    console.log("this is from the User Profile", payload);
    return(dispatch) => {
        dispatch({
            type:CREATE_USER_PROFILE,
            payload: payload
        });
    }
 } 

 export function gotoCarProfile(payload){
    return(dispatch) => {
        dispatch({
            type: NAV_TO_CAR_PROFILE,
            payload: payload
        });
    }
}

// Gets all available vehicles from Transporation Company
export function getVehicleGarage(){
    return(dispatch, store) => {
        const companyId = store().profile.driverInfo.company._id
        const vehicleGarageUrl = API_URL + "/api/availablevehicles/" +  companyId;
        return axios.get(vehicleGarageUrl, {
            headers: {authorization: "bearer " + store().login.token}
        }).then((response) => {
            var vehicleGarage = response.data;
            // let vehicleGarage = response.data.vehicles.filter((availableVehicles) => {
            //     return availableVehicles.vehicleAvailable
            // });
             dispatch({
                 type: VEHICLE_GARAGE,
                 payload: vehicleGarage
             });
             dispatch(isVehiclesLoading(false));
        }).catch((error) => {  
				console.log(error); 
				if (error.response.status === 401) {
					dispatch(unAuthUser());
					Actions.login({type: 'replace'})
			  	} else {
                    // dispatch(addAlert("Could not get Vehicles."));
                    Actions.error_modal({data: "Could not get retreive vehicles from server. Please wait a few minutes and try again."})

			  	}
        });
    }
}

//-------------------------------
// Action Handlers
//-------------------------------

// Used for the spinng loading button
function handleIsLoggingIn(state, action ) {
    return update(state, {
        loggingIn: {
            $set: action.payload
        }
    })
}

function handleIsLoading(state, action ) {
    return update(state, {
        isLoading: {
            $set: action.payload
        }
    })
}

function handlePasswordResetMessage(state, action){
    return update( state, {
       resetMessage: {
           $set: action.payload
       }
    })
}

function clearPasswordResetMessage(state, action){
    return update( state, {
       resetMessage: {
           $set: action.payload
       }
    })
}


function handleGetDriverInfo(state, action) {
	return update(state, {
		 driverInfo: {
			  $set: action.payload
		 }
	});
}

function handleIsSigningUp(state, action ) {
    return update(state, {
        signingUp: {
            $set: action.payload
        }
    })
}

function handleGetInputData(state, action) {
    const { key, value } = action.payload;
    return update(state, {
        inputData: {
            [key]: {
                $set: value
            }
        }
    });
}

function handleUserAuth(state, action){
   return update(state, {
        user_id: {
           $set: action.payload.user_id
       },
        email: {
            $set: action.payload.email
        },
        token: {
            $set: action.payload.token
        },
        expDate: {
            $set: action.payload.expDate
        }
   });
}

function handleUnAuthUser(state, action){
   return update(state, {
        user_id: {
            $set: undefined
        },
        email: {
            $set: undefined
        },
        token: {
            $set: undefined
        },
        expDate: {
            $set: undefined
        }
   });
}

function handleNeedsProfile(state, action){
    return update(state, {
        needsProfile: {
            $set: action.payload
        }
    });
 }

function handleCreateProfile(state, action){
    return update(state, {
        userProfile: {
            $set: action.payload
        }
    });
}

function handleCreateVehicleProfile(state, action){
    return update(state, {
        vehicleProfile: {
            $set: action.payload
        }
    });
}

function handleGetNewUserProfile(state, action){
    return update(state, {
        newUserProfile: {
            $set: action.payload
        }
    });
}

function handleNavToCarPage(state, action){
    return update(state, {
        navToCarPage: {
            $set: action.payload
        }
    });
}

function handleClearProfile(state, action){
    return update(state, {
        userProfile: {
            $set: undefined
        },
        navToCarPage: {
            $set: false
        }
    });
}

function handleGetVehicleGarage(state, action ) {
    return update(state, {
        vehicleGarage: {
            $set: action.payload
        }
    })
}
 
const ACTION_HANDLERS = {
    GET_INPUT: handleGetInputData,
    GET_DRIVER_INFORMATION: handleGetDriverInfo,
    AUTH_USER: handleUserAuth,
    UNAUTH_USER: handleUnAuthUser,
    NEEDS_PROFILE: handleNeedsProfile,
    CREATE_USER_PROFILE: handleCreateProfile,
    CREATE_VEHICLE_PROFILE: handleCreateVehicleProfile,
    NAV_TO_CAR_PROFILE: handleNavToCarPage,
    IS_LOGGING_IN: handleIsLoggingIn,
    IS_SIGNING_UP: handleIsSigningUp,
    USER_PROFILE_CREATED: handleGetNewUserProfile,
    CLEAR_PROFILE: handleClearProfile,
    VEHICLE_GARAGE: handleGetVehicleGarage,
    IS_LOADING: handleIsLoading,
    PASSWORD_RESET_MESSAGE: handlePasswordResetMessage,
    CLEAR_PASSWORD_RESET_MESSAGE: clearPasswordResetMessage
}



export function LoginReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}