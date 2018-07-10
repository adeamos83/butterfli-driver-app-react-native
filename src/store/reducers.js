import { combineReducers } from "redux";
import { HomeReducer as home } from "../routes/Home/modules/home";
import { RideRequestReducer as rideRequest } from "../routes/RideRequest/modules/rideRequest"; 


export const makeRootReducer = () => {
	return combineReducers({
		home,
		rideRequest
	});
}

export default makeRootReducer;

