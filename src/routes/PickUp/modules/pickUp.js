import update from 'react-addons-update';
import constants from './actionConstants';
import { Dimensions, Platform, Linking } from 'react-native';


import request from '../../../util/request';
const polyline = require('@mapbox/polyline');
//-------------------------------
// Constants
//-------------------------------
const { GET_CURRENT_LOCATION,
        UPDATE_BOOKING_DETAILS, 
        DRIVER_STATUS,
        IN_ROUTE_TO,
        WATCH_DRIVER_LOCATION,
        MARKER_LOCATION,
        NEAR_DRIVER_ALERTED,
        GET_DISTANCE_FROM
        } = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0181;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
var API_URL = "http://localhost:3000";
// var API_URL = "https://dry-gorge-77566.herokuapp.com";


//-------------------------------
// Intial State
//-------------------------------

const initialState = {
    region: {},
    inputData: {},
    nearDriverAlerted: false,
    // distanceFrom: {}
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

export function updateBookingDetails(key, instance){
    // Update Booking Details
    return(dispatch, store) => {
        const payload = {
            data: {
                ...store().home.bookingDetails,
                [key]: instance,
            }
        };
        const bookingID = store().home.bookingDetails._id
        console.log(payload);
        request.put(`${API_URL}/api/bookings/${bookingID}`)
        .send(payload)
        .finish((error, res) => {
                dispatch({
                    type: UPDATE_BOOKING_DETAILS,
                    payload: res.body
                });
            
        });
    }
}


export function getDriverStatus(payload){
    return(dispatch) => {
        dispatch({
            type: DRIVER_STATUS,
            payload: payload
        });
    }
}

export function getNearDriverAlerted(payload){
    return(dispatch) => {
        dispatch({
            type: NEAR_DRIVER_ALERTED,
            payload: payload
        });
    }
}


export function watchDriverLocation(){
    return(dispatch, store) => {
        navigator.geolocation.watchPosition(
            (position) => {
                dispatch({
                    type: WATCH_DRIVER_LOCATION,
                    payload: position
                });

                if(true){
                    console.log("Sending drivers location to passenger")
                        dispatch({
                            type: "server/driverlocation",
                            payload: position
                        });
                }
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10}
        );
    }
}

export function getMarkerLocation(location){
    return(dispatch, store) => {
        dispatch({
            type: MARKER_LOCATION,
            payload: location
        });

        dispatch({
            type: "server/driverlocation",
            payload: location
        });
    }
}


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
// Get Distance from Driver to pickUp or dropOff Location

export function getDistanceFrom() {
    return(dispatch, store) => {
        if(store().home.updateWatchDriverLocation){
            console.log("Getting arrival time");
            request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
            .query({
                units: 'imperial',
                origins: store().pickUp.updateWatchDriverLocation.coordinates.coordinates[1] + 
                "," + store().pickUp.updateWatchDriverLocation.coordinates.coordinates[0],
                destinations: store().home.bookingDetails.pickUp.latitude + 
                "," + store().home.bookingDetails.pickUp.longitude,
                mode: "driving",
                key: "AIzaSyDYndj5Gfh1rp5VUFHHu6gnN4vy2GQ0hvo"
            })
            .finish((error, res) => {
                dispatch({
                    type: GET_DISTANCE_FROM,
                    payload: res.body
                })
            })
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

function handleUpdateBookingDetails(state, action){
    return update(state, {
        bookingDetails: {
            $set: action.payload
        }
    }); 
}

function handleDriverStatus(state, action){
    return update(state, {
        driverStatus: {
            $set: action.payload
        }
    });
}

function handleNearDriverAlerted(state, action){
    return update(state, {
        nearDriverAlerted: {
            $set: action.payload
        }
    });
}



function handelWatchDriverLocation(state, action) {
    return update(state, {
        watchDriverLocation: {
            $set: action.payload
        }
    });
}

function handleUpdateDriverLocation(state, action) {
    return update(state, {
        updateWatchDriverLocation: {
            $set: action.payload
        }
    });
}

function handleGetMarkerLocation(state, action) {
    return update(state, {
        markerLocation: {
            $set: action.payload
        }
    });
}


function handleInRouteTo(state, action){
    return update(state, {
        bookingDetails: {
            $set: action.payload
        }
    });

}

function handleGetDistanceFrom(state, action){
    return update(state, {
        distanceFrom: {
            $set: action.payload
        }
    });
}

const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: handleGetCurrentLocation,
    DRIVER_STATUS: handleDriverStatus,
    IN_ROUTE_TO: handleInRouteTo,
    WATCH_DRIVER_LOCATION: handelWatchDriverLocation,
    UPDATE_WATCH_LOCATION: handleUpdateDriverLocation,
    MARKER_LOCATION: handleGetMarkerLocation,
    NEAR_DRIVER_ALERTED: handleNearDriverAlerted,
    GET_DISTANCE_FROM: handleGetDistanceFrom,
    UPDATE_BOOKING_DETAILS: handleUpdateBookingDetails
}



export function PickUpReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}