import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';

import uuid from 'uuid';

//-------------------------------
// Constants
//-------------------------------
const { AUTH_USER,
        UNAUTH_USER
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
    ADD_ALERT: handleAddAlert,
    REMOVE_ALERT: handleRemoveAlert,
}



export function AlertsReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}