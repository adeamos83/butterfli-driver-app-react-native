import { connect } from 'react-redux';
import Profile from '../components/profile';

import { getCurrentRoute } from '../../Home/modules/home';

import { getRideHistory,
         canEditProfile,
         changeVehicleServiceType,
         getDriverInfo,
         updateDriverProfile        
         } from '../modules/profile';

const mapStateToProps = (state) => ({
   driverInfo: state.profile.driverInfo || {},
   user_id: state.home.user_id,
   rideHistory: state.profile.rideHistory || {},
   bookingDetails: state.home.bookDetails || {},
   updatedDriverInfo: state.profile.updatedDriverInfo || {},
   canEdit: state.profile.canEdit,
   currentRoute: state.home.currentRoute
});

const mapActionCreators = {
   getRideHistory,
   canEditProfile,
   getCurrentRoute,
   changeVehicleServiceType,
   getDriverInfo,
   updateDriverProfile
};

export default connect(mapStateToProps, mapActionCreators)(Profile)