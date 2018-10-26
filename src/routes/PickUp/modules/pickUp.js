import update from 'react-addons-update';
import constants from './actionConstants';
import { Dimensions, Platform, Linking } from 'react-native';
import { API_URL, MAPBOX_ACCESS_TOKEN, GOOGLE_API_KEY } from '../../../api';
import axios from 'axios';
import request from '../../../util/request';
const polyline = require('@mapbox/polyline');
import { getLatLonDiffInMeters } from '../../../util/helper';
import { unAuthUser } from '../../Login/modules/login'
import { updateBookingDetails, otherBookingDetails } from '../../Home/modules/home'
//-------------------------------
// Constants
//-------------------------------
const { 
        // GET_CURRENT_LOCATION,
        // UPDATE_BOOKING_DETAILS, 
        // DRIVER_STATUS,
        // IN_ROUTE_TO,
        // WATCH_DRIVER_LOCATION,
        // MARKER_LOCATION,
        // NEAR_DRIVER_ALERTED,
        GET_DISTANCE_FROM,
        PICKUP_ARRIVING_ALERTED,
        GET_PICKUP_ROUTE,
        DISTANCE_FROM_PICKUP
        } = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;


//-------------------------------
// Intial State
//-------------------------------

const initialState = {
    region: {},
    inputData: {},
    pickUpArrivingAlert: false,
    nearDriverAlerted: false,
    // distanceFrom: {}
};



//-------------------------------
// Action
//-------------------------------

export function getPickUpDistance(){
    return(dispatch, store) => {
        const distFrom = getLatLonDiffInMeters(store().home.watchDriverLocation.coords.latitude, store().home.watchDriverLocation.coords.longitude,
        store().home.bookingDetails.pickUp.latitude, store().home.bookingDetails.pickUp.longitude);

        dispatch({
            type: DISTANCE_FROM_PICKUP,
            payload: distFrom
        });
    }
}
// export function getCurrentLocation() {
//     return(dispatch) => {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 dispatch({
//                     type: GET_CURRENT_LOCATION,
//                     payload: position
//                 });
//             },
//             (error) => console.log(error.message),
//             {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
//         );
//     }
// }

// export function updateBookingDetails(key, instance){
//     // Update Booking Details
//     return(dispatch, store) => {
//         const payload = {
//             data: {
//                 ...store().home.bookingDetails,
//                 [key]: instance,
//             }
//         };
//         const bookingID = store().home.bookingDetails._id
//         console.log(payload);
//         request.put(`${API_URL}/api/bookings/${bookingID}`)
//         .send(payload)
//         .finish((error, res) => {
//                 dispatch({
//                     type: UPDATE_BOOKING_DETAILS,
//                     payload: res.body
//                 });
            
//         });
//     }
// }


// export function getDriverStatus(payload){
//     return(dispatch) => {
//         dispatch({
//             type: DRIVER_STATUS,
//             payload: payload
//         });
//     }
// }

// export function getNearDriverAlerted(payload){
//     return(dispatch) => {
//         dispatch({
//             type: NEAR_DRIVER_ALERTED,
//             payload: payload
//         });
//     }
// }


// export function watchDriverLocation(){
//     return(dispatch, store) => {
//         navigator.geolocation.watchPosition(
//             (position) => {
//                 dispatch({
//                     type: WATCH_DRIVER_LOCATION,
//                     payload: position
//                 });

//                 if(true){
//                     console.log("Sending drivers location to passenger")
//                         dispatch({
//                             type: "server/driverlocation",
//                             payload: position
//                         });
//                 }
//             },
//             (error) => console.log(error.message),
//             {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10}
//         );
//     }
// }

// export function getMarkerLocation(location){
//     return(dispatch, store) => {
//         dispatch({
//             type: MARKER_LOCATION,
//             payload: location
//         });

//         dispatch({
//             type: "server/driverlocation",
//             payload: location
//         });
//     }
// }


// export function openMapsRoute(payload){
//     return(dispatch, store) => {
//         const pickUpArr = {
//             latitude:  store().home.bookingDetails.pickUp.latitude,
//             longitude: store().home.bookingDetails.pickUp.longitude 
//         };

//         const dropOffArr = {
//             latitude:  store().home.bookingDetails.dropOff.latitude,
//             longitude: store().home.bookingDetails.dropOff.longitude
//         };

//         buildLngLat = (position) => {
//             return `${position.latitude},${position.longitude}`
//         };
        
//         const origin = this.buildLngLat(pickUpArr);
//         const destination = this.buildLngLat(dropOffArr);

//         buildMapBoxUrl = (origin, destination) => {
//             return `http://maps.apple.com/?saddr=${origin}&daddr=${destination}&dirflg=d`
//         } 

//         const url = this.buildMapBoxUrl(origin, destination);
        
//         console.log('open directions') 
//         if (Platform.OS === "ios") { 
//             Linking.openURL(url)
//             dispatch({
//                 type:IN_ROUTE_TO,
//                 payload: payload
//             })

//         } else { 
//             Linking.openURL('http://maps.google.com/maps?daddr='); 
//         } 
//     }
// }


// Keep track of the arrive alert status
export function pickUpArrivingAlerted(payload){
    return(dispatch, store) => {
        dispatch({
            type: PICKUP_ARRIVING_ALERTED,
            payload: payload
        })
    }
}

// Get Distance from Driver to pickUp or dropOff Location
export function getDistanceFrom(instance) {
    return(dispatch, store) => {
        if(store().home.watchDriverLocation){
            console.log("Getting arrival time");
            request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
            .query({
                units: 'imperial',
                // origins: store().home.updateWatchDriverLocation.coordinates.coordinates[1] + 
                // "," + store().home.updateWatchDriverLocation.coordinates.coordinates[0],
                origins: store().home.watchDriverLocation.coords.latitude + 
                "," + store().home.watchDriverLocation.coords.longitude,
                destinations: store().home.bookingDetails.pickUp.latitude + 
                "," + store().home.bookingDetails.pickUp.longitude,
                mode: "driving",
                key: GOOGLE_API_KEY
            })
            .finish((error, res) => {
                dispatch({
                    type: GET_DISTANCE_FROM,
                    payload: res.body
                })
                dispatch(updateDistanceToPickUp());
            })
        }
    }
}

export function getPickUpRoute(){

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
            return `${position.longitude},${position.latitude}`
        }
    
        buildMapBoxUrl = (mode, driver, destination, accessToken) => {
            return `https://api.mapbox.com/directions/v5/mapbox/${mode}/${driver};${destination}.json?access_token=${accessToken}&steps=true&overview=full&geometries=polyline`
        }
    
        const mode = 'driving';
        // const origin = buildLngLat(pickUpArr);
        const destination = buildLngLat(pickUpArr);
        const driver = buildLngLat(driverArr);
        const url = buildMapBoxUrl(mode, driver, destination, MAPBOX_ACCESS_TOKEN);
        // const url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${driver};${origin};${destination}.json?access_token=${accessToken}&steps=true&overview=full&geometries=polyline`
    
        getCoordinates = (json) => {
            let route = []
        
            if (json.routes.length > 0) {
              json.routes[0].legs.forEach(legs => {
                legs.steps.forEach(step => {
                  polyline.decode(step.geometry).forEach(coord => route.push(coord))
                })
              })
            }
        
            return route.map(l => ({latitude: l[0], longitude: l[1]}))
        }

        if(store().home.bookingDetails.pickUp && store().home.bookingDetails.dropOff){
            fetch(url).then(response => response.json()).then(json => {

                const pickUpRoute = getCoordinates(json);
                dispatch({
                    type: GET_PICKUP_ROUTE,
                    payload: pickUpRoute
                })
                // this.route = {};
                // this.route1 = this.getCoordinates(json);
            }).catch(e => {
              console.warn(e)
              	if (error.response.status === 401) {
                	dispatch(unAuthUser());
                	Actions.login({type: 'replace'})
            	}
            })
        }
    }    
}

// Update Booking Details 
export function updateDistanceToPickUp(){
    return(dispatch, store) => {
        const data = {
            ...store().home.bookingDetails,
            selectedDriver: store().home.driverLocation._id,
            distanceToPickUp: {
                duration: store().pickUp.distanceFrom.rows[0].elements[0].duration.text,
                distance: store().pickUp.distanceFrom.rows[0].elements[0].distance.text
            }
        };       
        const bookingID = store().home.bookingDetails._id;

        return axios.put(`${API_URL}/api/bookings/${bookingID}`, {data}, {
            headers: {authorization: "bearer " + store().login.token}
        }).then((res) => {
            console.log("Sending distance to pickUp details");
            // dispatch({
            //     type: UPDATE_BOOKING_DETAILS,
            //     payload: res.data
            // });
            dispatch(otherBookingDetails(res.data));
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                dispatch(unAuthUser());
                Actions.login({type: 'replace'})
            }
        })

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

// function handleUpdateBookingDetails(state, action){
//     return update(state, {
//         bookingDetails: {
//             $set: action.payload
//         }
//     }); 
// }

// function handleDriverStatus(state, action){
//     return update(state, {
//         driverStatus: {
//             $set: action.payload
//         }
//     });
// }

// function handleNearDriverAlerted(state, action){
//     return update(state, {
//         nearDriverAlerted: {
//             $set: action.payload
//         }
//     });
// }



// function handelWatchDriverLocation(state, action) {
//     return update(state, {
//         watchDriverLocation: {
//             $set: action.payload
//         }
//     });
// }

// function handleUpdateDriverLocation(state, action) {
//     return update(state, {
//         updateWatchDriverLocation: {
//             $set: action.payload
//         }
//     });
// }

// function handleGetMarkerLocation(state, action) {
//     return update(state, {
//         markerLocation: {
//             $set: action.payload
//         }
//     });
// }

function handleGetPickUpRoutes(state, action) {
    return update(state, {
        pickUpRoutes: {
            $set:action.payload
        }
    })
}

function handlePickUpArrivingAlerted(state, action) {
    return update(state, {
        pickUpArrivingAlert: {
            $set:action.payload
        }
    })
}

// function handleInRouteTo(state, action){
//     return update(state, {
//         bookingDetails: {
//             $set: action.payload
//         }
//     });

// }

function handleGetDistanceFrom(state, action){
    return update(state, {
        distanceFrom: {
            $set: action.payload
        }
    });
}

function handlepickUpDistance(state, action){
    return update(state, {
        pickUpDistance: {
            $set: action.payload
        }
    });
}

function handleBookingComplete(state, action){
    return update(state, {
        pickUpDistance: {
            $set: undefined
        }
    }); 
}

const ACTION_HANDLERS = {
    // GET_CURRENT_LOCATION: handleGetCurrentLocation,
    // DRIVER_STATUS: handleDriverStatus,
    // IN_ROUTE_TO: handleInRouteTo,
    // WATCH_DRIVER_LOCATION: handelWatchDriverLocation,
    // UPDATE_WATCH_LOCATION: handleUpdateDriverLocation,
    // MARKER_LOCATION: handleGetMarkerLocation,
    // NEAR_DRIVER_ALERTED: handleNearDriverAlerted,
    GET_DISTANCE_FROM: handleGetDistanceFrom,
    // UPDATE_BOOKING_DETAILS: handleUpdateBookingDetails,
    GET_PICKUP_ROUTE: handleGetPickUpRoutes,
    PICKUP_ARRIVING_ALERTED: handlePickUpArrivingAlerted,
    DISTANCE_FROM_PICKUP: handlepickUpDistance,
    BOOKING_REQUEST_COMPLETED: handleBookingComplete,
}



export function PickUpReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}