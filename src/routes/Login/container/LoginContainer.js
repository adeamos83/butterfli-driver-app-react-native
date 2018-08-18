import { connect } from 'react-redux';
import Login from '../components/login';

import { authUser, 
         unAuthUser, 
         addAlert,
         removeAlert,
         loginUser,
         signupUser,
         needsToCreateProfile,
         createProfile,
         getInputData,
         createVehicleProfile
        } from '../modules/login';

const mapStateToProps = (state) => ({
    user_id: state.login.user_id || "",
    alerts: state.alerts,
    needsProfile: state.login.needsProfile,
    inputData: state.login.inputData || {},
    vehicleProfile: state.login.vehicleProfile || {},
    userProfile: state.login.userProfile || {}
});

const mapActionCreators = {
   authUser,
   unAuthUser,
   addAlert,
   removeAlert,
   loginUser,
   signupUser,
   needsToCreateProfile,
   createProfile,
   getInputData,
   createVehicleProfile
};

export default connect(mapStateToProps, mapActionCreators)(Login)