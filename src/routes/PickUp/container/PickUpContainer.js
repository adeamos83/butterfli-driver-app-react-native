import { connect } from 'react-redux';
import PickUp from '../components/pickUp';

import { getCurrentLocation, 
        openMapsRoute,
        watchDriverLocation,
        getDriverStatus,
        getMarkerLocation,
        getNearDriverAlerted,
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
    nearDriverAlerted: state.home.nearDriverAlerted, 
    updateWatchDriverLocation: state.home.updateWatchDriverLocation || {},
    routes: state.rideRequest.routes || {}
});

const mapActionCreators = {
    getCurrentLocation,
    openMapsRoute,
    watchDriverLocation,
    getDriverStatus,
    getMarkerLocation,
    getNearDriverAlerted,
};

export default connect(mapStateToProps, mapActionCreators)(PickUp)