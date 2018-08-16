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
         getInputData
        } from '../modules/login';

const mapStateToProps = (state) => ({
    user_id: state.login.user_id || "",
    alerts: state.alerts,
    needsProfile: state.login.needsProfile,
    inputData: state.login.inputData || {},
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
   getInputData
};

export default connect(mapStateToProps, mapActionCreators)(Login)