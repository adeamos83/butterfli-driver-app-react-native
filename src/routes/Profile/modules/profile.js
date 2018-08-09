import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';


//-------------------------------
// Constants
//-------------------------------
const { 
        } = constants;

// var API_URL = "http://localhost:3000";
var API_URL = "https://lit-coast-94226.herokuapp.com";


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



const ACTION_HANDLERS = {
    
}



export function ProfileReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}