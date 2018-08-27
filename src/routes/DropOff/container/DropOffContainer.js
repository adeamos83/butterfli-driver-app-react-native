import { connect } from 'react-redux';
import DropOff from '../components/dropOff';

import { getDriverStatus,
        getCurrentRoute,
        updateBookingDetails,
        getMarkerLocation,
        openMapsRoute,
        watchingDriverLocation } from '../../Home/modules/home';

import { getCurrentLocation,
        // getNearDriverAlerted,
        getDistanceFrom,
        getDropOffRoute
        } from '../modules/dropOff';

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
    distanceFrom: state.dropOff.distanceFrom || {},
    dropOffRoutes: state.dropOff.dropOffRoutes || {}
});

const mapActionCreators = {
    getCurrentLocation,
    getCurrentRoute,
    updateBookingDetails,
    openMapsRoute,
    watchingDriverLocation,
    getDriverStatus,
    getMarkerLocation,
    // getNearDriverAlerted,
    getDistanceFrom,
    getDropOffRoute
};

export default connect(mapStateToProps, mapActionCreators)(DropOff)