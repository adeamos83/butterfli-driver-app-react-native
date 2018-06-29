import update from 'react-addons-update';
import constants from './actionConstants';
import { Dimensions, Platform, Linking } from 'react-native';


import request from '../../../util/request';
// const polyline = require('@mapbox/polyline');
//-------------------------------
// Constants
//-------------------------------
const { GET_CURRENT_LOCATION, 
        GET_INPUT, 
        GET_DRIVER_INFORMATION,
        GET_SOCKET_ID,
        POST_DRIVER_LOCATION,
        IN_ROUTE_TO
        } = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0181;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;


//-------------------------------
// Intial State
//-------------------------------

const initialState = {
    region: {},
    inputData: {},
};



//-------------------------------
// Action
//-------------------------------
export function getCurrentLocation() {
    return(dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: GET_CURRENT_LOCATION,
                    payload: position
                });
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }
}

// Get User Input
export function getInputData(payload) {
    return{
        type: GET_INPUT,
        payload
    }
}


export function getDriverInfo() {
    return (dispatch, store) => {
        let id = "5b1af815fb6fc033f8801510";
        request.get("http://localhost:3000/api/driver/" + id)
        .finish((error, res)=>{
            dispatch({
                type: GET_DRIVER_INFORMATION,
                payload: res.body
            });
        });
    }
}

export function getDriverSocketId() {
    return (dispatch, store) => {
        dispatch({
            type: "server/hello",
        })
    }
}

export function postDriverLocation(){
    return(dispatch, store) => {
        const payload = {
            data: {
                driverId: store().home.driverInfo._id,
                coordinates: {
                    type: "Point",
                    coordinates: [store().home.region.latitude, store().home.region.longitude]
                },
                socketId: store().home.driverSocketId,
            }
        };

        request.post("http://localhost:3000/api/driverLocation")
        .send(payload)
        .finish((error, res) => {
                dispatch({
                    type: POST_DRIVER_LOCATION,
                    payload: res.body
                });
            
        });
    }
}

// export function getBookings(){
//     return (dispatch, store) => {
//         socket.on("driverRequest", (savedbooking) => {
//             dispatch({
//                 type: NEW_BOOKING,
//                 payload: savedbooking
//             })
//         })
       
//     }
// }

export function openMapsRoute(payload){
    return(dispatch, store) => {
        const pickUpArr = {
            latitude:  store().home.bookingDetails.pickUp.latitude,
            longitude: store().home.bookingDetails.pickUp.longitude 
        };

        const dropOffArr = {
            latitude:  store().home.bookingDetails.dropOff.latitude,
            longitude: store().home.bookingDetails.dropOff.longitude
        };

        buildLngLat = (position) => {
            return `${position.latitude},${position.longitude}`
        };
        
        const origin = this.buildLngLat(pickUpArr);
        const destination = this.buildLngLat(dropOffArr);

        buildMapBoxUrl = (origin, destination) => {
            return `http://maps.apple.com/?saddr=${origin}&daddr=${destination}&dirflg=d`
        } 

        const url = this.buildMapBoxUrl(origin, destination);
        
        console.log('open directions') 
        if (Platform.OS === "ios") { 
            Linking.openURL(url)
            dispatch({
                type:IN_ROUTE_TO,
                payload: payload
            })

        } else { 
            Linking.openURL('http://maps.google.com/maps?daddr='); 
        } 
    }
}

//-------------------------------
// Action Handlers
//-------------------------------

function handleGetCurrentLocation(state, action) {
    return update(state, {
        region: {
            latitude: {
                $set: action.payload.coords.latitude
            },
            longitude: {
                $set: action.payload.coords.longitude
            },
            latitudeDelta: {
                $set: LATITUDE_DELTA
            },
            longitudeDelta: {
                $set: LONGITUDE_DELTA
            }
            
        }
    });
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

function handleGetDriverInfo(state, action) {
    return update(state, {
        driverInfo: {
            $set: action.payload
        }
    });
}

function handelGetDriverSocket(state, action){
    return update(state, {
        driverSocketId: {
            $set: action.payload
        }
    });
}


function handlePostDriverLocation(state, action) {
    return update(state, {
        driverLocation: {
            $set: action.payload
        }
    });
}

function handleGetNewBooking(state, action) {
    return update(state, {
        bookingDetails: {
            $set: action.payload
        }
    });
}

function handleInRouteTo(state, action){
    return update(state, {
        bookingDetails: {
            inRouteTo:{
                $set: action.payload
            }
            
        }
    });

}

const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: handleGetCurrentLocation,
    GET_INPUT: handleGetInputData,
    GET_DRIVER_INFORMATION: handleGetDriverInfo,
    GET_SOCKET_ID: handelGetDriverSocket,
    POST_DRIVER_LOCATION: handlePostDriverLocation,
    NEW_BOOKING: handleGetNewBooking,
    IN_ROUTE_TO: handleInRouteTo
    
}



export function HomeReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}