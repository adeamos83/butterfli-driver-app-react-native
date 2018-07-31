import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';
import uuid from 'uuid';

//-------------------------------
// Constants
//-------------------------------
const { AUTH_USER,
        UNAUTH_USER,
        ADD_ALERT,
        REMOVE_ALERT
        } = constants;

var API_URL = "http://localhost:3000";
// var API_URL = "https://dry-gorge-77566.herokuapp.com";


//-------------------------------
// Intial State
//-------------------------------

const initialState = {
    alerts:[]
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

export function unAuthUser(){
    return(dispatch) => {
        dispatch({
            type: UNAUTH_USER,
        });
    }
}

export function addAlert(text){
    return(dispatch) => {
        dispatch({
            type: ADD_ALERT,
            text
        });
    }
 }
 
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
           $set: action.payload
       }
   });
}

function handleUnAuthUser(state, action){
   return update(state, {
       user_id: {
           $set: undefined
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

 function handleRemoveAlert(state, action){
    return state.alerts.filter((alert) => {
     if(alert.id === action.id){
         return false
     } else {
         return true;
     }
    });
 }
 
const ACTION_HANDLERS = {
    AUTH_USER: handleUserAuth,
    UNAUTH_USER: handleUnAuthUser,
    ADD_ALERT: handleAddAlert,
    REMOVE_ALERT: handleRemoveAlert,
}



export function LoginReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}