import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';


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


const ACTION_HANDLERS = {
    AUTH_USER: handleUserAuth,
    UNAUTH_USER: handleUnAuthUser,
}



export function MenuReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}