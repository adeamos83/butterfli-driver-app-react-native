import update from 'react-addons-update';
import constants from './actionConstants';
import { Dimensions, Platform, Linking } from 'react-native';


import request from '../../../util/request';
// const polyline = require('@mapbox/polyline');
//-------------------------------
// Constants
//-------------------------------
const { GET_CURRENT_LOCATION, 
        DRIVER_STATUS,
        GET_INPUT, 
        GET_DRIVER_INFORMATION,
        GET_SOCKET_ID,
        POST_DRIVER_LOCATION,
        IN_ROUTE_TO,
        WATCH_DRIVER_LOCATION,
        MARKER_LOCATION,
        NEAR_DRIVER_ALERTED,
        UPDATE_RIDE_REQUEST_STATUS,
        UPDATE_BOOKING_DETAILS
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
    driverStatus: "notAvailable"

};



//-------------------------------
// Action
//-------------------------------
export function getCurrentLocation() {
    // Get the current location of the driver
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

export function getDriverStatus(payload){
    // Get the status of driver - available, notAvailable, pickUp, dropOff, rideCompleted
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

export function updateRideRequestStatus(payload){
    return(dispatch, store) => {
        let updateBooking = {
            status: payload,
            ...store().home.bookingDetails,
            
        }
        dispatch({
            type: UPDATE_RIDE_REQUEST_STATUS,
            payload:updateBooking
        });
    }
}

export function watchDriverLocation(){
    /*
    This Function uses the geolocation API to watch consistenly what the 
    drivers location when ever they move more 10meters
    */
    return(dispatch, store) => {
        navigator.geolocation.watchPosition(
            (position) => {
                dispatch({
                    type: WATCH_DRIVER_LOCATION,
                    payload: position
                });
                // This funciton send the location to the server to be saved on the database using socket io
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
    // Used to get the location for the current marker movement
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

// Get User Input
export function getInputData(payload) {
    return{
        type: GET_INPUT,
        payload
    }
}


export function getDriverInfo() {
    // Get Driver Details 
    return (dispatch, store) => {
        let id = "5b1af815fb6fc033f8801510";
        request.get(`${API_URL}/api/driver/` + id)
        .finish((error, res)=>{
            dispatch({
                type: GET_DRIVER_INFORMATION,
                payload: res.body
            });
        });
    }
}

export function getDriverSocketId() {
    //Get Driver Socket ID
    return (dispatch, store) => {
        dispatch({
            type: "server/hello",
        })
    }
}

export function postDriverLocation(){
    // Send driver initial location to the database to be saved
    return(dispatch, store) => {
        const payload = {
            data: {
                driverId: store().home.driverInfo._id,
                coordinates: {
                    type: "Point",
                    coordinates: [store().home.region.longitude, store().home.region.latitude]
                },
                socketId: store().home.driverSocketId,
                driverStatus: store().home.driverInfo.driverStatus
            }
        };

        request.post(`${API_URL}/api/driverLocation`)
        .send(payload)
        .finish((error, res) => {
                dispatch({
                    type: POST_DRIVER_LOCATION,
                    payload: res.body
                });
            
        });
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

function handleDriverStatus(state, action){
    return update(state, {
        driverStatus: {
            $set: action.payload
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

function handleNearDriverAlerted(state, action){
    return update(state, {
        nearDriverAlerted: {
            $set: action.payload
        }
    });
}

function handleUpdateRideRequestStatus(state, action){
    return update(state, {
        bookingDetails: {
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
    DRIVER_STATUS: handleDriverStatus,
    GET_INPUT: handleGetInputData,
    GET_DRIVER_INFORMATION: handleGetDriverInfo,
    GET_SOCKET_ID: handelGetDriverSocket,
    POST_DRIVER_LOCATION: handlePostDriverLocation,
    NEW_BOOKING: handleGetNewBooking,
    IN_ROUTE_TO: handleInRouteTo,
    WATCH_DRIVER_LOCATION: handelWatchDriverLocation,
    UPDATE_WATCH_LOCATION: handleUpdateDriverLocation,
    MARKER_LOCATION: handleGetMarkerLocation,
    NEAR_DRIVER_ALERTED: handleNearDriverAlerted,
    UPDATE_RIDE_REQUEST_STATUS: handleUpdateRideRequestStatus,
    UPDATE_BOOKING_DETAILS: handleUpdateBookingDetails
}



export function HomeReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}