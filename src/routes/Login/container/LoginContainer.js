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
            createCarProfile,
            createUserProfile,
            gotoCarProfile,
            isLoggingIn,
            isSigningUp
        } from '../modules/login';

const mapStateToProps = (state) => ({
    user_id: state.login.user_id || "",
    token: state.login.token,
    expData: state.login.expData,
    alerts: state.alerts,
    needsProfile: state.login.needsProfile,
    inputData: state.login.inputData || {},
    vehicleProfile: state.login.vehicleProfile || {},
    userProfile: state.login.userProfile || {},
    navToCarPage: state.login.navToCarPage || "",
    loggingIn: state.login.loggingIn,
    signingUp: state.login.signingUp,
    newUserProfile: state.login.newUserProfile || {},
    currentRoute: state.home.currentRoute,
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
   createUserProfile,
   createCarProfile,
   gotoCarProfile,
   isLoggingIn,
   isSigningUp
};

export default connect(mapStateToProps, mapActionCreators)(Login)