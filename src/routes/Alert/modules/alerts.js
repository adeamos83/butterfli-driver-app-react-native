import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';
import { API_URL } from '../../../api';

import uuid from 'uuid';

//-------------------------------
// Constants
//-------------------------------
const { ADD_ALERT,
        REMOVE_ALERT
        } = constants;

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

function handleAddAlert(state=alerts, action){
    let alert = [
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
    ADD_ALERT: handleAddAlert,
    REMOVE_ALERT: handleRemoveAlert,
}



export function AlertsReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}