import { connect } from 'react-redux';
import Home from '../components/home';

import { getRideHistory } from '../../Profile/modules/profile';

import { isDriverConnecting,
        getCurrentRoute,
        getCurrentLocation, 
        getDriverInfo,
        getDriverSocketId,
        postDriverLocation,
        openMapsRoute,
        watchingDriverLocation,
        getDriverStatus,
        getMarkerLocation,
        updateRideRequestStatus,
        updateBookingDetails,
        rejectBookingRequest,
        disconnectSocketIO,
        acceptRideRequest,
        updateDriverLocationDetails,
        newSelectedDriverSocketId
        } from '../modules/home';

const mapStateToProps = (state) => ({
    driverConnecting: state.home.driverConnecting,
    user_id: state.login.user_id,
    currentRoute: state.home.currentRoute,
    region: state.home.region,
    driverInfo: state.home.driverInfo || {},
    driverLocation: state.home.driverLocation || {},
    bookingDetails: state.home.bookingDetails || {},
    watchDriverLocation: state.home.watchDriverLocation || {},
    driverSocketId: state.home.driverSocketId,
    driverStatus: state.home.driverStatus,
    selectedDriver: state.home.selectedDriver || {}
});

const mapActionCreators = {
    isDriverConnecting,
    getCurrentRoute,
    getCurrentLocation,
    getDriverInfo,
    getDriverSocketId,
    postDriverLocation,
    openMapsRoute,
    watchingDriverLocation,
    getDriverStatus,
    getMarkerLocation,
    updateRideRequestStatus,
    updateBookingDetails,
    rejectBookingRequest,
    disconnectSocketIO,
    acceptRideRequest,
    updateDriverLocationDetails,
    newSelectedDriverSocketId,
    getRideHistory
};

export default connect(mapStateToProps, mapActionCreators)(Home)