import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';

import uuid from 'uuid';
import axios from 'axios';

import {SIGNIN_URL, SIGNUP_URL, API_URL, CREATE_PROFILE_URL} from '../../../api';
import {addAlert} from '../../Alert/modules/alerts';
import { disconnectSocketIO } from '../../Home/modules/home';

//-------------------------------
// Constants
//-------------------------------
const { AUTH_USER,
        UNAUTH_USER,
        ADD_ALERT,
        REMOVE_ALERT,
        CREATE_USER_PROFILE,
        CREATE_VEHICLE_PROFILE,
        NEEDS_PROFILE,
        GET_INPUT,
        NAV_TO_CAR_PROFILE,
        IS_LOGGING_IN,
        IS_SIGNING_UP,
        USER_PROFILE_CREATED
        } = constants;

//-------------------------------
// Intial State
//-------------------------------

const initialState = {
    alerts:[],
    needsProfile: false,
    inputData: {},
    gotoCarPage: false,
    loggingIn: false,
    signingUp: false
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

export function loginUser(email, password){
   return(dispatch) => {
       return axios.post(SIGNIN_URL, {email, password}).then((response) => {
            var {user_id, token, isProfileCreated} = response.data;
            var userDetails = {
                user_id: user_id,
                email: email,
                token: token
            }
            dispatch({
                type: AUTH_USER,
                payload: userDetails
            });
            dispatch(isLoggingIn(false));
            dispatch(needsToCreateProfile(isProfileCreated));
       }).catch((error) => {
        dispatch(isLoggingIn(false));
        dispatch(addAlert("Could not log in."));
       });
   }
}

export function signupUser(email, password){
    return(dispatch) => {
        return axios.post(SIGNUP_URL, {email, password}).then((response) => {
             var {user_id, token} = response.data;
             var userDetails = {
                user_id: user_id,
                email: email,
                token: token
            }
             dispatch({
                 type: AUTH_USER,
                 payload: userDetails
             });
             setTimeout(function(){
                dispatch(isSigningUp(false));
             }, 3000)
        }).catch((error) => {
         dispatch(addAlert("Could not sign up."));
         setTimeout(function(){
            dispatch(isSigningUp(false));
         }, 3000)
        });
    }
 }
 

export function authUser(user_id){
    return(dispatch) => {
        dispatch({
            type: AUTH_USER,
            payload: user_id
        });
    }
 }

export function unAuthUser(){
    return(dispatch) => {
        disconnectSocketIO();
        dispatch({
            type: UNAUTH_USER,
        });
    }
}

export function needsToCreateProfile(payload){
    return(dispatch) => {
        dispatch({
            type: NEEDS_PROFILE,
            payload: payload
        });
    }
 }

export function createProfile(){
    return(dispatch, store) => {
        // dispatch({
        //     type:CREATE_USER_PROFILE,
        //     payload: payload
        // })
        var details = {
            user_id: store().login.user_id,
            email: store().login.email,
            ...store().login.userProfile,
            vehicle: {
                ...store().login.vehicleProfile
            }
        }
        console.log("from create profile redux function", details);
        // var details = {
        //     firstName: payload.firstName,
        //     lastName: payload.lastName,
        //     dob: payload.dob,
        //     email: store().login.email,
        //     vehicle: {
        //         make: payload.make,
        //         model: payload.model,
        //         plateNumber: payload.license,
        //         year: payload.year,
        //         color: payload.color
        //     }
        // }
        // console.log(details);
        return axios.post(CREATE_PROFILE_URL, details, {
            headers: {authorization: store().login.token}
        }).then((response) => {
             var details = response.data;
             console.log(details);
             dispatch(addAlert("User Profile Created"));
             dispatch({
                 type: USER_PROFILE_CREATED,
                 payload: details
             });
             Actions.home({type: "replace"})
             dispatch(isSigningUp(false));

            //  setTimeout(function(){
            //     dispatch(isSigningUp(false));
            //  }, 3000)
        }).catch((error) => {
            dispatch(addAlert("Could not create User Profile."));
            dispatch(isSigningUp(false));
            // setTimeout(function(){
            //     dispatch(isSigningUp(false));
            // }, 3000)
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
    return(dispatch, store) => {
        dispatch({
            type:CREATE_USER_PROFILE,
            payload: payload
        })
    }
 }

// export function addAlert(text){
//     return(dispatch) => {
//         dispatch({
//             type: ADD_ALERT,
//             text
//         });
//     }
//  }
 
 export function removeAlert(id){
     return(dispatch) => {
         dispatch({
             type: REMOVE_ALERT,
             id
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

function handleAddAlert(state, action){
    alert = [
        {
            text: action.text,
            id: uuid.v4()
        }
    ]
    
    return update(state, {
        alerts: {
            $push: alert
        }
    });
 }

 function handleRemoveAlert(state=alerts, action){
    if(state.alerts){
        let alert = state.alerts.filter((alert) => {
            if(alert.id === action.id){
                return false
            } else {
                return true;
            }
        });
        return update(state, {
            alerts: {
                $set: alert
            }
        });
    } else {

        return update(state, {
            alerts: {
                $set: []
            }
        });
    }
}
 
const ACTION_HANDLERS = {
    GET_INPUT: handleGetInputData,
    AUTH_USER: handleUserAuth,
    UNAUTH_USER: handleUnAuthUser,
    // ADD_ALERT: handleAddAlert,
    REMOVE_ALERT: handleRemoveAlert,
    NEEDS_PROFILE: handleNeedsProfile,
    CREATE_USER_PROFILE: handleCreateProfile,
    CREATE_VEHICLE_PROFILE: handleCreateVehicleProfile,
    NAV_TO_CAR_PROFILE: handleNavToCarPage,
    IS_LOGGING_IN: handleIsLoggingIn,
    IS_SIGNING_UP: handleIsSigningUp,
    USER_PROFILE_CREATED: handleGetNewUserProfile
}



export function LoginReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}