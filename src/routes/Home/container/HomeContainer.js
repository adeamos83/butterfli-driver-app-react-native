import { connect } from 'react-redux';
import Home from '../components/home';

import { isDriverConnecting,
        getCurrentRoute,
        getCurrentLocation, 
        // getInputData, 
        getDriverInfo,
        getDriverSocketId,
        postDriverLocation,
        openMapsRoute,
        watchingDriverLocation,
        getDriverStatus,
        getMarkerLocation,
        // getNearDriverAlerted,
        updateRideRequestStatus,
        updateBookingDetails,
        rejectBookingRequest,
        disconnectSocketIO,
        acceptRideRequest,
        updateDriverLocationDetails,
        } from '../modules/home';

const mapStateToProps = (state) => ({
    driverConnecting: state.home.driverConnecting,
    user_id: state.login.user_id,
    currentRoute: state.home.currentRoute,
    region: state.home.region,
    // inputData: state.home.inputData || {},
    driverInfo: state.home.driverInfo || {},
    driverLocation: state.home.driverLocation || {},
    bookingDetails: state.home.bookingDetails || {},
    watchDriverLocation: state.home.watchDriverLocation || {},
    driverSocketId: state.home.driverSocketId,
    driverStatus: state.home.driverStatus,
    // nearDriverAlerted: state.home.nearDriverAlerted, 
    selectedDriver: state.home.selectedDriver || {}
});

const mapActionCreators = {
    isDriverConnecting,
    getCurrentRoute,
    getCurrentLocation,
    // getInputData,
    getDriverInfo,
    getDriverSocketId,
    postDriverLocation,
    openMapsRoute,
    watchingDriverLocation,
    getDriverStatus,
    getMarkerLocation,
    // getNearDriverAlerted,
    updateRideRequestStatus,
    updateBookingDetails,
    rejectBookingRequest,
    disconnectSocketIO,
    acceptRideRequest,
    updateDriverLocationDetails
};

export default connect(mapStateToProps, mapActionCreators)(Home)