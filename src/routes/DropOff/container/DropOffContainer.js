import { connect } from 'react-redux';
import DropOff from '../components/dropOff';

import { getDriverStatus,
        updateBookingDetails,
        getMarkerLocation,
        openMapsRoute } from '../../Home/modules/home';

import { getCurrentLocation,
        watchDriverLocation,
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
    // nearDriverAlerted: state.home.nearDriverAlerted, 
    updateWatchDriverLocation: state.home.updateWatchDriverLocation || {},
    distanceFrom: state.dropOff.distanceFrom || {},
    dropOffRoutes: state.dropOff.dropOffRoutes || {}
});

const mapActionCreators = {
    getCurrentLocation,
    updateBookingDetails,
    openMapsRoute,
    watchDriverLocation,
    getDriverStatus,
    getMarkerLocation,
    // getNearDriverAlerted,
    getDistanceFrom,
    getDropOffRoute
};

export default connect(mapStateToProps, mapActionCreators)(DropOff)