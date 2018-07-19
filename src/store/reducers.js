import { combineReducers } from "redux";
import { HomeReducer as home } from "../routes/Home/modules/home";
import { RideRequestReducer as rideRequest } from "../routes/RideRequest/modules/rideRequest"; 
import { PickUpReducer as pickUp } from "../routes/PickUp/modules/pickUp";
import { DropOffReducer as dropOff } from "../routes/DropOff/modules/dropOff";

export const makeRootReducer = () => {
	return combineReducers({
		home,
		rideRequest,
		pickUp,
		dropOff
	});
}

export default makeRootReducer;

