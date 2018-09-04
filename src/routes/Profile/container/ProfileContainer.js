import { connect } from 'react-redux';
import Profile from '../components/profile';

import { getCurrentRoute } from '../../Home/modules/home';

import { getRideHistory,
         changeVehcileType         
         } from '../modules/profile';

const mapStateToProps = (state) => ({
   driverInfo: state.home.driverInfo || {},
   user_id: state.home.user_id,
   rideHistory: state.profile.rideHistory || {},
   bookingDetails: state.home.bookDetails || {},
   updatedDriverInfo: state.profile.updatedDriverInfo || {}
});

const mapActionCreators = {
   getRideHistory,
   getCurrentRoute,
   changeVehcileType
};

export default connect(mapStateToProps, mapActionCreators)(Profile)