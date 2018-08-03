import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';
import uuid from 'uuid';
import axios from 'axios';

import {SIGNIN_URL, SIGNUP_URL, CREATE_PROFILE} from '../../../api';
import {addAlert} from '../../Alert/modules/alerts';

//-------------------------------
// Constants
//-------------------------------
const { AUTH_USER,
        UNAUTH_USER,
        ADD_ALERT,
        REMOVE_ALERT,
        CREATE_USER_PROFILE,
        NEEDS_PROFILE
        } = constants;

var API_URL = "http://localhost:3000";
// var API_URL = "https://dry-gorge-77566.herokuapp.com";


//-------------------------------
// Intial State
//-------------------------------

const initialState = {
    alerts:[],
    needsProfile: false
};



//-------------------------------
// Action
//-------------------------------

export function loginUser(email, password){
   return(dispatch) => {
       return axios.post(SIGNIN_URL, {email, password}).then((response) => {
            var {user_id, token} = response.data;
            var userDetails = {
                user_id: user_id,
                email: email
            }
            dispatch(addAlert(token));
            dispatch({
                type: AUTH_USER,
                payload: userDetails
            });
       }).catch((error) => {
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
                email: email
            }
             dispatch(addAlert(token));
             dispatch({
                 type: AUTH_USER,
                 payload: userDetails
             });
        }).catch((error) => {
         dispatch(addAlert("Could not sign up."));
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

export function createProfile(payload){
    return(dispatch, store) => {
        var details = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            dob: payload.dob,
            email: store().login.email,
            vehicle: {
                make: payload.make,
                model: payload.model,
                plateNumber: payload.license,
                year: payload.year,
                color: payload.color
            }
        }
        console.log(details);
        // return axios.post(CREATE_PROFILE, details).then((response) => {
        //      var deatils = response.data;
        //      console.log(details);
        //      dispatch(addAlert("User Profile Created"));
        //     //  dispatch({
        //     //      type: CREATE_USER_PROFILE,
        //     //      payload: details
        //     //  });
        // }).catch((error) => {
        //  dispatch(addAlert("Could not create User Profile."));
        // });
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

//-------------------------------
// Action Handlers
//-------------------------------

function handleUserAuth(state, action){
   return update(state, {
        user_id: {
           $set: action.payload.user_id
       },
        email: {
            $set: action.payload.email
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
        profile: {
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
    AUTH_USER: handleUserAuth,
    UNAUTH_USER: handleUnAuthUser,
    // ADD_ALERT: handleAddAlert,
    REMOVE_ALERT: handleRemoveAlert,
    NEEDS_PROFILE: handleNeedsProfile
    // CREATE_USER_PROFILE: handleCreateProfile
}



export function LoginReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}