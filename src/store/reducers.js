import { combineReducers } from "redux";
import { HomeReducer as home } from "../routes/Home/modules/home";
import { PickUpReducer as pickUp } from "../routes/PickUp/modules/pickUp"; 


export const makeRootReducer = () => {
	return combineReducers({
		home,
		pickUp
	});
}

export default makeRootReducer;

