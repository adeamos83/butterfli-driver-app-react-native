import { combineReducers } from "redux";
import { HomeReducer as home } from "../routes/Home/modules/home";
import { RideRequestReducer as rideRequest } from "../routes/RideRequest/modules/rideRequest"; 
import { PickUpReducer as pickUp } from "../routes/PickUp/modules/pickUp";
import { DropOffReducer as dropOff } from "../routes/DropOff/modules/dropOff";
import { reducer as formReducer } from 'redux-form';
import { LoginReducer as login } from '../routes/Login/modules/login';
import { MenuReducer as menu } from '../routes/Menu/modules/menu';
import { AlertsReducer as alerts } from '../routes/Alert/modules/alerts';


export const makeRootReducer = () => {
	return combineReducers({
		home,
		rideRequest,
		pickUp,
		dropOff,
		form: formReducer,
		login,
		menu,
		alerts

	});
}

export default makeRootReducer;

