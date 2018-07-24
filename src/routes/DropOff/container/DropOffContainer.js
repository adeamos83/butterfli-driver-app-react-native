import { connect } from 'react-redux';
import DropOff from '../components/dropOff';

import { getCurrentLocation, 
        updateBookingDetails,
        openMapsRoute,
        watchDriverLocation,
        getDriverStatus,
        getMarkerLocation,
        getNearDriverAlerted,
        getDistanceFrom
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
    nearDriverAlerted: state.home.nearDriverAlerted, 
    updateWatchDriverLocation: state.home.updateWatchDriverLocation || {},
    routes: state.rideRequest.routes || {},
    distanceFrom: state.dropOff.distanceFrom || {}
});

const mapActionCreators = {
    getCurrentLocation,
    updateBookingDetails,
    openMapsRoute,
    watchDriverLocation,
    getDriverStatus,
    getMarkerLocation,
    getNearDriverAlerted,
    getDistanceFrom
};

export default connect(mapStateToProps, mapActionCreators)(DropOff)