import update from 'react-addons-update';
import constants from './actionConstants';
import { Dimensions, Platform, Linking, AppState } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { API_URL } from '../../../api';
import request from '../../../util/request';
import io from "socket.io-client/dist/socket.io";

import { addAlert } from '../../Alert/modules/alerts';
import { unAuthUser } from '../../Login/modules/login';

//-------------------------------
// Constants
//-------------------------------
const { DRIVER_CONNECTING,
        CURRENT_ROUTE,
        GET_CURRENT_LOCATION, 
        NEW_BOOKING_ALERT,
        DRIVER_STATUS,
        // GET_DRIVER_INFORMATION,
        POST_DRIVER_LOCATION,
        DB_UPDATED_DRIVER_LOCATION,
        IN_ROUTE_TO,
        WATCH_DRIVER_LOCATION,
        MARKER_LOCATION,
        UPDATE_BOOKING_DETAILS,
        REJECT_BOOKING_REQUEST,
        CANCEL_BOOKING_REQUEST,
        BOOKING_REQUEST_COMPLETED,
        SELECTED_DRIVERS,
        APP_STATE,
        UPDATE_DRIVER_LOCATION_DETAILS
        } = constants;

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01 ;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//-------------------------------
// Intial State
//-------------------------------

const initialState = {
    driverConnecting: false,
    region: {},
    newBookingAlert: false,
    watchDriverLocation: {},
    inputData: {},
    driverStatus: "notAvailable",
    fetched: false,
    fetching: false
};



//-------------------------------
// Action
//-------------------------------

export function checkStatus(response){
    console.log("This is status: ", response.status);
    console.log("This is config: ", response.config);
    console.log("This is data: ", response.data);
    console.log("This is response: ", response.response);
    

    if (response.status >= 200 && response.status < 300) {
        return response;
      }
    
      if (response.response.status === 401) {
        unAuthUser();
        Actions.login({type: 'replace'})
      }
    
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
}

export function getAppState(payload) {
    return ( dispatch, store ) => {
        dispatch({
            type: APP_STATE,
            payload: payload
        })
    }
}

// Keep track if driver has been alerted of new booking
export function newBookingAlerted(payload){
    return(dispatch, store) => {
        dispatch({
            type: NEW_BOOKING_ALERT,
            payload: payload
        })
    }
}

//Get current route
export function getCurrentRoute(){
    return (dispatch, store) => {
        var prevRoute,
        currentRoute;
        
        if(!store().home.currentRoute){
            console.log("Current scene from 1st IF Statement ", store().home.currentRoute)
            currentRoute = Actions.currentScene
        } else {
            prevRoute = store().home.currentRoute;
            console.log("This is prevRoute ", prevRoute);
            currentRoute = Actions.currentScene
            console.log("This is Store CurrentRoute ", store().home.currentRoute)
        }

        payload = {
            prevRoute, 
            currentRoute
        }
        console.log("Current route payload ", payload)
        dispatch({
            type: CURRENT_ROUTE,
            payload: payload
        })
    }
}

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
                // driverId: store().login.user_id,
                // driver: store().login.user_id, 
                // name: store().profile.driverInfo.firstName + " " + store().profile.driverInfo.lastName,
                // phoneNumber: store().profile.driverInfo.phoneNumber,
                // coordinates: {
                //     type: "Point",
                //     coordinates: [store().home.region.longitude, store().home.region.latitude]
                // },
                // socketId: store().home.driverSocketId,
                ...store().home.driverLocation,
                driverStatus: driverStatus,
                // vehicle: store().profile.selectedVehicle._id,
                // serviceType: store().profile.driverInfo.serviceType
        };
        
        //Updates local redux state with Driver Status
        dispatch({
            type: DRIVER_STATUS,
            payload: driverStatus
        });

        //Updates database with Driver Status
        return axios.put(`${API_URL}/api/driverLocation/` + id, {payload}, {
            headers: {authorization: store().login.token}
        }).then((res) => {
            dispatch({
                type: DB_UPDATED_DRIVER_LOCATION,
                payload: res.data
            });
            dispatch(isDriverConnecting(false)); 
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                dispatch(unAuthUser());
                Actions.login({type: 'replace'})
            }
        })
    }
}

// Updates booking details that the driver rejected ride, Updates nearByDrivers array removing this driver from array
export function rejectBookingRequest(){
    return(dispatch, store) => {
        const nearByDrivers = store().home.bookingDetails.nearByDrivers;
        const id = store().home.bookingDetails._id
        console.log("Before Filter");
        console.log(nearByDrivers);
        let nextDrivers = nearByDrivers.filter((nearBy) => {
            console.log("Near by scoket id: ", nearBy.socketId, "Store socket id: ", store().home.driverSocketId);
            return nearBy.socketId !== store().home.driverSocketId
        });
        
        if(nextDrivers.length == 0){
            nextDrivers = [];
        }

        console.log("These are the near by drivers", nextDrivers);
        const payload = {
            data: {
                ...store().home.bookingDetails,
                rideRequestStatus: "rejected",
                nearByDrivers: nextDrivers, 
            }
        };
        console.log("Near by drivers is being sent ", payload.data.nearByDrivers == undefined);

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

// This function cancels a trip one a driver is on the trip and send canelation back to server
export function cancelBookingRequest(){
    return(dispatch, store) => {
        const id = store().home.bookingDetails._id
        const payload = {
            data: {
                ...store().home.bookingDetails,
                rideRequestStatus: "canceled",
            }
        };

        //Updates database with Cancelation Request
        // return axios.put(`${API_URL}/api/bookings.` + id, {payload}, {
        //     headers: {authorization: store().login.token}
        // }).then((res) => {
        //     dispatch({
        //         type: CANCEL_BOOKING_REQUEST,
        //     });
        // }).catch((error) => {
        //     console.log(error);
        // })

        request.put(`${API_URL}/api/bookings/${id}`)
        .send(payload)
        .finish((error, res) => {
            dispatch({
                type: CANCEL_BOOKING_REQUEST
            });
            console.log("This is an error from the server", error);
            console.log("This is a response from the server", res)
        });
    }
}

export function bookingRequestCompleted(){
    return(dispatch) => {
        dispatch({
            type: BOOKING_REQUEST_COMPLETED
        })
    }
}

/*
    This Function uses the geolocation API to watch consistenly what the 
    drivers location when ever they move more 10meters
*/
export function watchingDriverLocation(position){
    return(dispatch, store) => {
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
        //             console.log("Sending drivers location to passenger")
        //                 dispatch({
        //                     type: "server/driverlocation",
        //                     payload: position
        //                 });
        //         }
        // navigator.geolocation.watchPosition(
        //     (position) => {
        //         dispatch({
        //             type: WATCH_DRIVER_LOCATION,
        //             payload: position
        //         });
        //         // This funciton send the location to the server to be saved on the database using socket io
        //         if(true){
        //             console.log("Sending drivers location to passenger")
        //                 dispatch({
        //                     type: "server/driverlocation",
        //                     payload: position
        //                 });
        //         }
        //     },
        //     (error) => console.log(error.message),
        //     {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 5}
        // );
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

//================================================ Need to Test ASAP
// Get Driver Details from server
// export function getDriverInfo() {
//     return (dispatch, store) => {
//         let user_id = store().login.user_id;
//         console.log(user_id);
//         let id = "5b5d05220fdb907bdb8a5c2d";

//         return axios.get(`${API_URL}/api/driver/` + user_id, {
//             headers: {authorization: store().login.token}
//         }).then((res) => {
//             console.log("This is Get Driver Info", res);
//             dispatch({
//                 type: GET_DRIVER_INFORMATION,
//                 payload: res.data
//             });
//         }).catch((error) => {
//             console.log(error);
//             dispatch(addAlert("Could not get Driver Profile."));
//         });

//     }
// }

//Get Driver Socket ID from server
export function getDriverSocketId() {
    return (dispatch, store) => {
        if(!store().home.driverSocketId){
            console.log("intial connection");
            dispatch({
                type: "server/hello",
            })
            dispatch(postDriverLocation());
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
        const data = {
                // DriverId is always equal to User_id
                driverId: store().login.user_id,
                driver: store().login.user_id,
                name: store().profile.driverInfo.firstName + " " + store().profile.driverInfo.lastName,
                phoneNumber: store().profile.driverInfo.phoneNumber,
                coordinates: {
                    type: "Point",
                    coordinates: [store().home.region.longitude, store().home.region.latitude]
                },
                socketId: store().home.driverSocketId,
                driverStatus: store().home.driverStatus,
                vehicle: store().profile.selectedVehicle._id,
                serviceType: store().profile.driverInfo.serviceType
        };

        console.log("Driver location that is going to be posted: ", data);
        return axios.post(`${API_URL}/api/driverLocation`, {data}, {
            headers: {authorization: store().login.token}
        })
        .then((res) => {
            dispatch({
                type: POST_DRIVER_LOCATION,
                payload: res.data
            });
        }).catch((error) => {
            console.log(error); 
            if (error.response.status === 401) {
                dispatch(unAuthUser());
                Actions.login({type: 'replace'})
            }
        })

    }
}

// Update Booking Details 
export function updateBookingDetails(key, instance){
    return(dispatch, store) => {
        const data = {
            ...store().home.bookingDetails,
            [key]: instance,
            selectedDriver: store().home.driverLocation._id 
        };
       
        const bookingID = store().home.bookingDetails._id;

        return axios.put(`${API_URL}/api/bookings/${bookingID}`, {data}, {
            headers: {authorization: store().login.token}
        }).then((res) => {
            console.log("This is the Updated Booking Details", res);
            dispatch({
                type: UPDATE_BOOKING_DETAILS,
                payload: res.data
            });
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                dispatch(unAuthUser());
                Actions.login({type: 'replace'})
            }
        })

    }
}

export function updateDriverLocationDetails(key, instance){
    return(dispatch, store) => {
        const data = {
            ...store().home.driverLocation,
            [key]: instance,
        };
        console.log(data)
        const driverLocationId = store().home.driverLocation._id;
        return axios.put(`${API_URL}/api/driverLocation/${driverLocationId}`, {data}, {
            headers: {authorization: store().login.token}
        }).then((res) => {
            console.log("This is the Updated Driver Location Details", res);
            dispatch({
                type: UPDATE_DRIVER_LOCATION_DETAILS,
                payload: res.data
            });
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                dispatch(unAuthUser());
                Actions.login({type: 'replace'})
            }
        })
    }
}

// Opens up Apple Map, Google Maps or Waze when the driver clicks on navigate
export function openMapsRoute(payload){
    return(dispatch, store) => {
        const driverArr = {
            // latitude:  store().home.updateWatchDriverLocation.coordinates.coordinates[1],
            // longitude: store().home.updateWatchDriverLocation.coordinates.coordinates[0]
            latitude:  store().home.watchDriverLocation.coords.latitude,
            longitude: store().home.watchDriverLocation.coords.longitude,
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
        // const selectedDriverData = {
        //     // DriverId is always equal to User_id
        //     driverId: store().login.user_id,
        //     name: store().profile.driverInfo.firstName + " " + store().profile.driverInfo.lastName,
        //     phoneNumber: store().profile.driverInfo.phoneNumber,
        //     coordinates: {
        //         type: "Point",
        //         coordinates: [store().home.watchDriverLocation.coords.longitude, store().home.watchDriverLocation.coords.latitude]
        //     },
        //     socketId: store().home.driverSocketId,
        //     driverStatus: store().home.driverStatus,
        //     serviceType: store().profile.serviceType
        // };

        const data = {
            ...store().home.bookingDetails,
            rideRequestStatus: "accepted",
            selectedDriver: store().home.driverLocation._id,
        };

        const bookingID = store().home.bookingDetails._id

        return axios.put(`${API_URL}/api/bookings/${bookingID}`, {data}, {
            headers: {authorization: store().login.token}
        }).then((res) => {
            console.log("This Accept Ride Request", res);
            dispatch({
                type: SELECTED_DRIVERS,
                payload: res.data
            });
            Actions.rideRequest({type: "replace"});
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                dispatch(unAuthUser());
                Actions.login({type: 'replace'})
            }
        })
    }
}

// This will update the near drivers socket Id
export function newSelectedDriverSocketId(){
    return(dispatch, store) => {
        // const selectedDriverData = {
        //     // DriverId is always equal to User_id
        //     driverId: store().login.user_id,
        //     name: store().profile.driverInfo.firstName + " " + store().profile.driverInfo.lastName,
        //     phoneNumber: store().profile.driverInfo.phoneNumber,
        //     coordinates: {
        //         type: "Point",
        //         coordinates: [store().home.watchDriverLocation.coords.longitude, store().home.watchDriverLocation.coords.latitude]
        //     },
        //     socketId: store().home.driverSocketId,
        //     driverStatus: store().home.driverStatus,
        //     serviceType: store().profile.serviceType
        // };

        const data = {
            ...store().home.bookingDetails,
            selectedDriver: store().home.driverLocation._id,
        };
        
        // Checks make sure there is an acutal booking in driver state
        if(store().home.bookingDetails){
            const bookingID = store().home.bookingDetails._id;

            return axios.put(`${API_URL}/api/bookings/${bookingID}`, {data}, {
                headers: {authorization: store().login.token}
            }).then((res) => {
                console.log("This Accept Ride Request", res);
                dispatch({
                    type: SELECTED_DRIVERS,
                    payload: res.data
                });
            }).catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    dispatch(unAuthUser());
                    Actions.login({type: 'replace'})
                }
            })
        }
        
    }
}


//-------------------------------
// Action Handlers
//-------------------------------
function handelGetAppState(state, action){
    return update(state, {
        appState: {
            $set: action.payload
        }
    })
}

function handleNewBookingAlert(state, action){
    return update(state, {
        newBookingAlert: {
            $set: action.payload
        }
    })
}

function handleGetCurrentRoute(state,action){
    console.log("Current Scene from Action Handlers ", action.payload)
    return update(state, {
        currentRoute: {
            $set: action.payload.currentRoute
        },
        prevRoute: {
            $set: action.payload.prevRoute
        }
    })
}

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
        },
        watchDriverLocation: {
            coords: {
                latitude: {
                    $set: action.payload.latitude
                },
                longitude: {
                    $set: action.payload.longitude
                }
            }
        }
    });
}

// function handleGetDriverInfo(state, action) {
//     return update(state, {
//         driverInfo: {
//             $set: action.payload
//         }
//     });
// }

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
            },
            newBookingAlert: {
                $set: false
            }
        });
}

function handleUpdateDriverLocationDetails(state, action) {
    return update(state, {
        driverLocation: {
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
    CURRENT_ROUTE: handleGetCurrentRoute,
    GET_CURRENT_LOCATION: handleGetCurrentLocation,
    DRIVER_STATUS: handleDriverStatus,
    // GET_DRIVER_INFORMATION: handleGetDriverInfo,
    GET_SOCKET_ID: handelGetDriverSocket,
    POST_DRIVER_LOCATION: handlePostDriverLocation,
    DB_UPDATED_DRIVER_LOCATION: handlePostDriverLocation,
    NEW_BOOKING: handleGetNewBooking,
    IN_ROUTE_TO: handleInRouteTo,
    WATCH_DRIVER_LOCATION: handelWatchDriverLocation,
    UPDATE_WATCH_LOCATION: handleUpdateDriverLocation,
    MARKER_LOCATION: handleGetMarkerLocation,
    UPDATE_BOOKING_DETAILS: handleUpdateBookingDetails,
    UPDATED_DB_BOOKING_DETAILS: handleDBBookingDetailsUpdated,
    REJECT_BOOKING_REQUEST: handleRejectedBookingRequest,
    CANCEL_BOOKING_REQUEST: handleRejectedBookingRequest,
    BOOKING_REQUEST_COMPLETED: handleRejectedBookingRequest,
    SELECTED_DRIVERS: handelAcceptRideRequest,
    APP_STATE: handelGetAppState,
    UPDATE_DRIVER_LOCATION_DETAILS: handleUpdateDriverLocationDetails,
    NEW_BOOKING_ALERT: handleNewBookingAlert
}



export function HomeReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}