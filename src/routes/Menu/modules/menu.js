import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';
import { API_URL } from '../../../api';

//-------------------------------
// Constants
//-------------------------------
const { AUTH_USER
        } = constants;

//-------------------------------
// Intial State
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

const ACTION_HANDLERS = {
    AUTH_USER: handleUserAuth,
}



export function MenuReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}