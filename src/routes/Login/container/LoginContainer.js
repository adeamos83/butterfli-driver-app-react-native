import { connect } from 'react-redux';
import Login from '../components/login';

import { authUser, 
         unAuthUser, 
         addAlert,
         removeAlert,
         loginUser,
         signupUser,
         needsToCreateProfile,
         createProfile
         
        } from '../modules/login';

const mapStateToProps = (state) => ({
    user_id: state.login.user_id || "",
    alerts: state.alerts,
    needsProfile: state.login.needsProfile
});

const mapActionCreators = {
   authUser,
   unAuthUser,
   addAlert,
   removeAlert,
   loginUser,
   signupUser,
   needsToCreateProfile,
   createProfile
};

export default connect(mapStateToProps, mapActionCreators)(Login)