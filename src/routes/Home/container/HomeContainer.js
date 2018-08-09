import { connect } from 'react-redux';
import Home from '../components/home';

import { getCurrentLocation, 
        getInputData, 
        getDriverInfo,
        getDriverSocketId,
        postDriverLocation,
        openMapsRoute,
        watchDriverLocation,
        getDriverStatus,
        getMarkerLocation,
        getNearDriverAlerted,
        updateRideRequestStatus,
        updateBookingDetails,
        rejectBookingRequest,
        disconnectSocketIO
        } from '../modules/home';

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
});

const mapActionCreators = {
    getCurrentLocation,
    getInputData,
    getDriverInfo,
    getDriverSocketId,
    postDriverLocation,
    openMapsRoute,
    watchDriverLocation,
    getDriverStatus,
    getMarkerLocation,
    getNearDriverAlerted,
    updateRideRequestStatus,
    updateBookingDetails,
    rejectBookingRequest,
    disconnectSocketIO
};

export default connect(mapStateToProps, mapActionCreators)(Home)