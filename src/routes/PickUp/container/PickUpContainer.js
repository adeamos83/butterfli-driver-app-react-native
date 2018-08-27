import { connect } from 'react-redux';
import PickUp from '../components/pickUp';
import { getDriverStatus } from '../../Home/modules/home';

import { updateBookingDetails,
        getCurrentRoute, 
        watchingDriverLocation,
        getMarkerLocation, 
        openMapsRoute,
        getCurrentLocation,
        updateDriverLocationDetails,
        newSelectedDriverSocketId} from '../../Home/modules/home';

import { 
        // updateBookingDetails, 
        // getMarkerLocation,
        // getNearDriverAlerted,
        getDistanceFrom,
        getPickUpRoute
        } from '../modules/pickUp';

const mapStateToProps = (state) => ({
    region: state.home.region,
    inputData: state.home.inputData || {},
    driverInfo: state.home.driverInfo || {},
    driverLocation: state.home.driverLocation || {},
    bookingDetails: state.home.bookingDetails || {},
    watchDriverLocation: state.home.watchDriverLocation || {},
    driverSocketId: state.home.driverSocketId,
    driverStatus: state.home.driverStatus,
    user_id: state.login.user_id,
    // nearDriverAlerted: state.home.nearDriverAlerted, 
    updateWatchDriverLocation: state.home.updateWatchDriverLocation || {},
    routes: state.rideRequest.routes || {},
    distanceFrom: state.pickUp.distanceFrom || {},
    pickUpRoutes: state.pickUp.pickUpRoutes || {}
});

const mapActionCreators = {
    getCurrentLocation,
    getCurrentRoute,
    openMapsRoute,
    watchingDriverLocation,
    getDriverStatus,
    getMarkerLocation,
    // getNearDriverAlerted,
    getDistanceFrom,
    updateBookingDetails,
    getPickUpRoute,
    updateDriverLocationDetails,
    newSelectedDriverSocketId
};

export default connect(mapStateToProps, mapActionCreators)(PickUp)