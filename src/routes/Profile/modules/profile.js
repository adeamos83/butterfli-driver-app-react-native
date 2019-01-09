import update from 'react-addons-update';
import constants from './actionConstants';
import { Platform, Linking } from 'react-native';
import { API_URL, UPDATE_PROFILE_URL, UPDATE_VEHICLE_URL, CLEAR_VEHICLE_URL, AWS_ACCESSKEY, AWS_SECRETKEY } from '../../../api';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { getVehicleGarage, unAuthUser } from '../../Login/modules/login'
import { addAlert } from '../../Alert/modules/alerts';
import { RNS3 } from 'react-native-aws3';

//-------------------------------
// Constants
//-------------------------------
const { 
    UNAUTH_USER,
    GET_DRIVER_INFORMATION,
    EDITTING_PROFILE,
    USER_PROFILE_UPDATED,
    DRIVER_IMAGE_UPLOADED,
    DRIVER_RIDE_HISTORY,
    UPDATE_VEHICLE_TYPE,
    SELECT_VEHICLE_INFO,
    EDITTING_VEHICLE_PROFILE,
    IS_VEHICLES_LOADING,
    PROFILE_PIC_PATH
    } = constants;


//-------------------------------
// Intial Stat
//-------------------------------

const initialState = {
    canEdit: false,
    canEditVehicle: false,
    vehicleLoading: true,
    profilePicPath: null
};

const options = {
    keyPrefix: "driverImages/",
    bucket: "butterfli-webportal-image-upload",
    region: "us-west-1",
    accessKey: AWS_ACCESSKEY,
    secretKey: AWS_SECRETKEY,
    successActionStatus: 201
}


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

export function getDriverInfo() {
    return (dispatch, store) => {
        let user_id = store().login.user_id;
        console.log(user_id);
        let id = "5b5d05220fdb907bdb8a5c2d";

        return axios.get(`${API_URL}/api/driver/` + user_id, {
            headers: {authorization: "bearer " + store().login.token}
        }).then((res) => {
            dispatch({
                type: GET_DRIVER_INFORMATION,
                payload: res.data
            });
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
               dispatch(unAuthUser());
               Actions.login({type: 'replace'})
            } else {
            	Actions.error_modal({data: "Could not get Driver Profile."})
            }
        })
        .then(function(){
            dispatch(getVehicleGarage());
        })

    }
}

export function canEditProfile() {
    return(dispatch, store) => {
        dispatch({
            type:EDITTING_PROFILE,
            payload: !store().profile.canEdit
        })
    }
}

export function driverImageUpload(file){

    return(dispatch, store) => {
        RNS3.put(file, options).then(response => {
            if (response.status !== 201)
              throw new Error("Failed to upload image to S3");
            console.log(response.body);
            /**
             * {
             *   postResponse: {
             *     bucket: "your-bucket",
             *     etag : "9f620878e06d28774406017480a59fd4",
             *     key: "uploads/image.png",
             *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
             *   }
             * }
             */
            dispatch({
                type: DRIVER_IMAGE_UPLOADED,
                payload: response.body
            })
        });
        
    }
}

export function updateProfilePic(imageUri){
	return(dispatch, store) => {
		var picDetails = {
            ...store().profile.driverInfo, 
			profilePic: imageUri,
		}
        console.log(picDetails)
		update_Profile_Url = API_URL + "/api/driver/" + store().login.user_id;

		return axios.put(update_Profile_Url, picDetails, {
			headers: {authorization: "bearer " + store().login.token}
		}).then((response) => {
			var details = response.data;
			dispatch({
					type: USER_PROFILE_UPDATED,
					payload: details
			});
		}).catch((error) => {
            console.log("Update pic error: ")
            console.log(error)
			if (error.response.status === 401) {
					dispatch(unAuthUser());
					Actions.login({type: 'replace'})
			}
		});
	}
}

export function setProfilePicPath(uriPath){
    return(dispatch) => {
        dispatch({
            type: PROFILE_PIC_PATH,
            payload: uriPath
        })
    }
}


export function changeVehicleServiceType(value){
    return(dispatch, store) => {
        newDriver = {
            ...store().profile.driverInfo,
            serviceType: value
        }
        
        dispatch({
            type: UPDATE_VEHICLE_TYPE ,
            payload: newDriver
        })
    }
}

export function updateDriverProfile(firstName, lastName, email, phoneNumber){
    return(dispatch, store) => {
        var details = {
            // ...store().profile.driverInfo,
            firstName: firstName, 
            lastName: lastName, 
            email: email, 
            phoneNumber: phoneNumber,
            // vehicle: store().profile.selectedVehicle._id
        }
        console.log(details);
        update_Profile_Url = API_URL + "/api/driver/" + store().login.user_id;
        return axios.put(update_Profile_Url, details, {
            headers: {authorization: "bearer " + store().login.token}
        }).then((response) => {
             var details = response.data;
            //  dispatch(addAlert("User Profile Updated"));
             dispatch({
                 type: USER_PROFILE_UPDATED,
                 payload: details
             });
            //  Actions.home({type: "replace"})
            //  dispatch(isSigningUp(false));

        }).catch((error) => {
            // dispatch(addAlert("Could not update Driver Profile."));
            // dispatch(isSigningUp(false));
				console.log(error)
				if (error.response.status === 401) {
					dispatch(unAuthUser());
					Actions.login({type: 'replace'})
			  	}
        });
    }
 }

 export function getUpdatedDriverInfo(driverinfo){
    return(dispatch) => {
        dispatch({
            type: GET_DRIVER_INFORMATION,
            payload: driverinfo
        })
    }
 }

export function getRideHistory(){
    return(dispatch, store) => {
        const driverId = store().login.user_id
        const rideHistoryUrl = API_URL + "/api/driver/" + driverId + "/bookings";
        console.log(rideHistoryUrl);
        return axios.get(rideHistoryUrl, {
            headers: {authorization: "bearer " + store().login.token}
        }).then((response) => {
             var rideHistory = response.data;
             console.log(rideHistory);
             dispatch({
                 type: DRIVER_RIDE_HISTORY,
                 payload: rideHistory
             });
        }).catch((error) => {  
				console.log(error); 
				if (error.response.status === 401) {
					dispatch(unAuthUser());
					Actions.login({type: 'replace'})
			  	} else {
					dispatch(addAlert("Could not get Ride History."));
			  	}
        });
    }
}

export function getSelectedVehicle(payload){
    return(dispatch, store) => {
        dispatch({
            type:SELECT_VEHICLE_INFO,
            payload: payload
        })
    }
}

// Gathers needed information to send post request to create profile
export function updateVehicleProfile(){
    return(dispatch, store) => {
        var details = {
            ...store().profile.driverInfo,
            vehicle: store().profile.selectedVehicle._id
        }
        vehicleUpdateUrl = UPDATE_VEHICLE_URL + "/" + store().profile.driverInfo._id;
        return axios.put(vehicleUpdateUrl, details, {
            headers: {authorization: "bearer " + store().login.token}
        }).then((response) => {
            var details = response.data;
            dispatch({
                type: USER_PROFILE_UPDATED,
                payload: details
            });
            // dispatch({
            //     type:EDITTING_VEHICLE_PROFILE,
            //     payload: !store().profile.canEditVehicle
            // });
            Actions.home({type: 'replace'})
        }).catch((error) => {
            if (error.response.status === 401) {
               dispatch(unAuthUser());
               Actions.login({type: 'replace'})
            } else {
					dispatch(addAlert("Could not create User Profile."));
            }
        });
    }
 }

export function clearVehicleProfile() {
    return(dispatch, store) => {
        var details = {
            ...store().profile.driverInfo,
            vehicle: {
                ...store().profile.selectedVehicle,
                vehicleAvailable: true
            }
        }
        vehicleUpdateUrl = CLEAR_VEHICLE_URL + "/" + store().profile.driverInfo._id;
        return axios.put(vehicleUpdateUrl, details, {
            headers: {authorization: "bearer " + store().login.token}
        }).then((response) => {
            // var details = response.data;
            console.log(response.data);
            var details = {
                ...response.data,
                vehicle: null
            }
            dispatch({
                type: USER_PROFILE_UPDATED,
                payload: details
            });

            dispatch({
                type:SELECT_VEHICLE_INFO,
                payload: null
            });

            dispatch({
                type:EDITTING_VEHICLE_PROFILE,
                payload: !store().profile.canEditVehicle
            });
        }).catch((error) => {
            if (error.response.status === 401) {
               dispatch(unAuthUser());
               Actions.login({type: 'replace'})
            } else {
				dispatch(addAlert("Could not create User Profile."));
            }
        });
    }
}


 export function canEditVehicleProfile() {
    return(dispatch, store) => {
        dispatch({
            type:EDITTING_VEHICLE_PROFILE,
            payload: !store().profile.canEditVehicle
        })
    }
}

// Used for the loading spinner when loading vehicles 
export function isVehiclesLoading(payload){
    return (dispatch) => {
        dispatch({
            type: IS_VEHICLES_LOADING, 
            payload: payload
        })
    }
}


//-------------------------------
// Action Handlers
//-------------------------------

function handleGetDriverInfo(state, action) {
    return update(state, {
        driverInfo: {
            $set: action.payload
        }
    });
}
function handleCanEditProfile(state, action ) {
    return update(state, {
        canEdit: {
            $set: action.payload
        }
    })
}

function handleCanEditVehicleProfile(state, action ) {
    return update(state, {
        canEditVehicle: {
            $set: action.payload
        }
    })
}

function handleDriverImageUpload(state, action ) {
    return update(state, {
        driverImage: {
            $set: action.payload
        }
    })
}

function handleChangeServiceType(state, action ) {
    return update(state, {
        driverInfo: {
            $set: action.payload
        }
    })
}

function handleGetRideHistory(state, action ) {
    return update(state, {
        rideHistory: {
            $set: action.payload
        }
    })
}
 
 function handleSelectVehicle(state, action){
    return update(state, {
        selectedVehicle: {
            $set: action.payload
        }
    });
}

function handleIsVehiclesLoading(state, action ) {
    return update(state, {
        vehicleLoading: {
            $set: action.payload
        }
    })
}

function handleProfilePathPic(state, action ) {
    return update(state, {
        profilePicPath: {
            $set: action.payload
        }
    })
}


const ACTION_HANDLERS = {
    GET_DRIVER_INFORMATION: handleGetDriverInfo,
    EDITTING_PROFILE: handleCanEditProfile,
    DRIVER_IMAGE_UPLOADED: handleDriverImageUpload,
    USER_PROFILE_UPDATED: handleGetDriverInfo,
    UPDATE_VEHICLE_TYPE: handleChangeServiceType,
    DRIVER_RIDE_HISTORY: handleGetRideHistory,
    SELECT_VEHICLE_INFO: handleSelectVehicle,
    EDITTING_VEHICLE_PROFILE: handleCanEditVehicleProfile,
    IS_VEHICLES_LOADING: handleIsVehiclesLoading,
    PROFILE_PIC_PATH: handleProfilePathPic
}



export function ProfileReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}