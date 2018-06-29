import { connect } from 'react-redux';
import Home from '../components/home';

import { getCurrentLocation, 
        getInputData, 
        getDriverInfo,
        getDriverSocketId,
        postDriverLocation,
        openMapsRoute
        } from '../modules/home';

const mapStateToProps = (state) => ({
    region: state.home.region,
    inputData: state.home.inputData || {},
    driverInfo: state.home.driverInfo || {},
    driverLocation: state.home.driverLocation || {},
    bookingDetails: state.home.bookingDetails || {}
});

const mapActionCreators = {
    getCurrentLocation,
    getInputData,
    getDriverInfo,
    getDriverSocketId,
    postDriverLocation,
    openMapsRoute
};

export default connect(mapStateToProps, mapActionCreators)(Home)