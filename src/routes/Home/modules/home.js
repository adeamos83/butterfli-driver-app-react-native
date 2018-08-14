import update from 'react-addons-update';
import constants from './actionConstants';
import { Dimensions, Platform, Linking } from 'react-native';

import { API_URL } from '../../../api';
import request from '../../../util/request';

import io from "socket.io-client/dist/socket.io";
// const socket = io.connect(API_URL, {jsonp:false, forceNew: true});

// let socket = io(API_URL, {jsonp:false, 'force new connection':true});

// const polyline = require('@mapbox/polyline');
//-------------------------------
// Constants
//-------------------------------
const { DRIVER_CONNECTING,
        GET_CURRENT_LOCATION, 
        DRIVER_STATUS,
        // GET_INPUT, 
        GET_DRIVER_INFORMATION,
        GET_SOCKET_ID,
        POST_DRIVER_LOCATION,
        IN_ROUTE_TO,
        WATCH_DRIVER_LOCATION,
        MARKER_LOCATION,
        // NEAR_DRIVER_ALERTED,
        // UPDATE_RIDE_REQUEST_STATUS,
        UPDATE_BOOKING_DETAILS,
        REJECT_BOOKING_REQUEST,
        SELECTED_DRIVERS
        } = constants;

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0181;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//-------------------------------
// Intial State
//-------------------------------

const initialState = {
    driverConnecting: false,
    region: {},
    inputData: {},
    nearDriverAlerted: false,
    driverStatus: "notAvailable",
    fetched: false,
    fetching: false
};



//-------------------------------
// Action
//-------------------------------

// Used for the spinng loading buttong for connecting the driver to the socket io server
export function isDriverConnecting(payload){
    return (dispatch) => {
        dispatch({
            type: DRIVER_CONNECTING,
            payload: payload
        })
    }
}

// Get the current location of the driver
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

// Get the status of driver - available, notAvailable, pickUp, dropOff, rideCompleted
export function getDriverStatus(driverStatus){
    return(dispatch, store) => {
        const id = store().home.driverLocation._id;
        const payload = {
                // DriverId is always equal to User_id
                driverId: store().login.user_id,
                coordinates: {
                    type: "Point",
                    coordinates: [store().home.region.longitude, store().home.region.latitude]
                },
                socketId: store().home.driverSocketId,
                driverStatus: driverStatus
        };
        console.log(payload);

        //Updates local redux state with Driver Status
        dispatch({
            type: DRIVER_STATUS,
            payload: driverStatus
        });

        //Updates database with Driver Status
        request.put(`${API_URL}/api/driverLocation/` + id)
        .send(payload)
        .finish((error, res) => {
                dispatch({
                    type: POST_DRIVER_LOCATION,
                    payload: res.body
                });
                dispatch(isDriverConnecting(false));   
        });
    }
}

// export function getNearDriverAlerted(payload){
//     return(dispatch) => {
//         dispatch({
//             type: NEAR_DRIVER_ALERTED,
//             payload: payload
//         });
//     }
// }


// export function updateRideRequestStatus(payload){
//     return(dispatch, store) => {
//         let updateBooking = {
//             status: payload,
//             ...store().home.bookingDetails,
//         }
//         dispatch({
//             type: UPDATE_RIDE_REQUEST_STATUS,
//             payload:updateBooking
//         });
//     }
// }

// Updates booking details that the driver rejected ride, Updates nearByDrivers array removing this driver from array
export function rejectBookingRequest(payload){
    return(dispatch, store) => {
        const nearByDrivers = store().home.bookingDetails.nearByDrivers;
        const id = store().home.bookingDetails._id
        console.log("Before Filter");
        console.log(nearByDrivers);
        let nextDrivers = nearByDrivers.filter((nearBy) => {
            return nearBy.socketId !== store().home.driverSocketId
        });

        const payload = {
            data: {
                ...store().home.bookingDetails,
                rideRequestStatus: "rejected",
                nearByDrivers: nextDrivers,
            }
        };

        request.put(`${API_URL}/api/rejectedbookings/${id}`)
        .send(payload)
        .finish((error, res) => {
            dispatch({
                type: REJECT_BOOKING_REQUEST
            });
        });
        console.log("After Filter");
        console.log(nextDrivers);
    }
}

/*
    This Function uses the geolocation API to watch consistenly what the 
    drivers location when ever they move more 10meters
*/
export function watchDriverLocation(){
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

// For Testing purposes - Allow us to move marker location to mimic car movement
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

// // Get User Input
// export function getInputData(payload) {
//     return{
//         type: GET_INPUT,
//         payload
//     }
// }

//================================================ Need to Test ASAP
// Get Driver Details from server
export function getDriverInfo() {
    return (dispatch, store) => {
        let user_id = store().login.user_id;
        console.log(user_id);
        let id = "5b5d05220fdb907bdb8a5c2d";
        request.get(`${API_URL}/api/driver/` + user_id)
        .finish((error, res)=>{
            dispatch({
                type: GET_DRIVER_INFORMATION,
                payload: res.body
            });
        });
    }
}
//Get Driver Socket ID from server
export function getDriverSocketId() {
    return (dispatch, store) => {
        if(!store().home.driverSocketId){
            console.log("intial connection");
            dispatch({
                type: "server/hello",
            })
        } else {
            console.log("Trying to reconnect!");
            let socket = io.connect(API_URL, {jsonp:false, 'force new connection':true, reconnection: true,});
            socket.connect();
            socket.on('connect', () => console.log("Reconnected"))
            dispatch({
                type: "server/reconnect",
            })
            dispatch(postDriverLocation());
        }
    }
}

// Force disconnection from Socket Io server
export function disconnectSocketIO() {
    return (dispatch, store) => {
        let socket = io.connect(API_URL, {jsonp:false, 'force new connection':true, reconnection: true,});
        socket.disconnect();
        console.log("Driver is Disconnecting from Socket Io server")
        socket.on('disconnect', function() {
            console.log("Driver is reconnecting to Socket Io server")
           socket.connect();
        });
        dispatch({
            type: "server/clientDisconnect",
            payload: store().home.driverSocketId
        });
        dispatch(isDriverConnecting(false));
    }
}

// Post Driver Location and status to server
export function postDriverLocation(){
    return(dispatch, store) => {
        const payload = {
            data: {
                // DriverId is always equal to User_id
                driverId: store().login.user_id,
                coordinates: {
                    type: "Point",
                    coordinates: [store().home.region.longitude, store().home.region.latitude]
                },
                socketId: store().home.driverSocketId,
                driverStatus: store().home.driverStatus
            }
        };
        console.log(payload);
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

// Update Booking Details 
export function updateBookingDetails(key, instance){
    return(dispatch, store) => {
        const payload = {
            data: {
                ...store().home.bookingDetails,
                [key]: instance,
            }
        };
        const bookingID = store().home.bookingDetails._id;
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

// Opens up Apple Map, Google Maps or Waze when the driver clicks on navigate
export function openMapsRoute(payload){
    return(dispatch, store) => {
        const driverArr = {
            latitude:  store().home.updateWatchDriverLocation.coordinates.coordinates[1],
            longitude: store().home.updateWatchDriverLocation.coordinates.coordinates[0]
        }  

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
        
        if(payload == 'pickUp'){
            var origin = buildLngLat(driverArr);
            var destination = buildLngLat(pickUpArr);
        } else {
            var origin = buildLngLat(driverArr); 
            var destination = buildLngLat(dropOffArr);
        }
       
        buildMapBoxUrl = (origin, destination) => {
            return `http://maps.apple.com/?saddr=${origin}&daddr=${destination}&dirflg=d`
        } 

        const url = buildMapBoxUrl(origin, destination);
        
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

// Updated booking detail the Selected Drivers information and updates RideRequestStatus to accpeted
export function acceptRideRequest(){
    return(dispatch, store) => {
        // const acceptedDriver = {
        //     // DriverId is always equal to User_id
        //     driverId: store().login.user_id,
        //     coordinates: {
        //         type: "Point",
        //         coordinates: [store().home.region.longitude, store().home.region.latitude]
        //     },
        //     socketId: store().home.driverSocketId,
        //     driverStatus: store().home.driverStatus
        // };
        const payload = {
            data: {
                ...store().home.bookingDetails,
                rideRequestStatus: "accepted",
                selectedDriver: store().home.updateWatchDriverLocation,
            }
        };
        const bookingID = store().home.bookingDetails._id
        console.log(payload);
        request.put(`${API_URL}/api/bookings/${bookingID}`)
        .send(payload)
        .finish((error, res) => {
                dispatch({
                    type: SELECTED_DRIVERS,
                    payload: res.body
                });
            
        });
    }
}


//-------------------------------
// Action Handlers
//-------------------------------

function handleDriverConnecting(state, action ) {
    return update(state, {
        driverConnecting: {
            $set: action.payload
        }
    })
}

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

function handleRejectedBookingRequest(state, action){
    return update(state, {
        bookingDetails: {
            $set: undefined
        }
    }); 
}

function handleDBBookingDetailsUpdated(state, action){
    return update(state, {
        bookingDetails: {
            $set: action.payload
        }
    }); 
}

function handelAcceptRideRequest(state, action) {
    return update(state, {
        selectedDriver: {
            $set: action.payload
        }
    });
}

// function handleNearDriverAlerted(state, action){
//     return update(state, {
//         nearDriverAlerted: {
//             $set: action.payload
//         }
//     });
// }

// function handleUpdateRideRequestStatus(state, action){
//     return update(state, {
//         bookingDetails: {
//             $set: action.payload
//         }
//     });
// }

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

// function handleGetInputData(state, action) {
//     const { key, value } = action.payload;
//     return update(state, {
//         inputData: {
//             [key]: {
//                 $set: value
//             }
//         }
//     });
// }

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
    DRIVER_CONNECTING: handleDriverConnecting,
    GET_CURRENT_LOCATION: handleGetCurrentLocation,
    DRIVER_STATUS: handleDriverStatus,
    // GET_INPUT: handleGetInputData,
    GET_DRIVER_INFORMATION: handleGetDriverInfo,
    GET_SOCKET_ID: handelGetDriverSocket,
    POST_DRIVER_LOCATION: handlePostDriverLocation,
    NEW_BOOKING: handleGetNewBooking,
    IN_ROUTE_TO: handleInRouteTo,
    WATCH_DRIVER_LOCATION: handelWatchDriverLocation,
    UPDATE_WATCH_LOCATION: handleUpdateDriverLocation,
    MARKER_LOCATION: handleGetMarkerLocation,
    // NEAR_DRIVER_ALERTED: handleNearDriverAlerted,
    // UPDATE_RIDE_REQUEST_STATUS: handleUpdateRideRequestStatus,
    UPDATE_BOOKING_DETAILS: handleUpdateBookingDetails,
    UPDATED_DB_BOOKING_DETAILS: handleDBBookingDetailsUpdated,
    REJECT_BOOKING_REQUEST: handleRejectedBookingRequest,
    SELECTED_DRIVERS: handelAcceptRideRequest
}



export function HomeReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}