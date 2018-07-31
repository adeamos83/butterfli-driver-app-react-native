import { connect } from 'react-redux';
import Login from '../components/login';

import { authUser, 
         unAuthUser, 
         addAlert,
         removeAlert
        } from '../modules/login';

const mapStateToProps = (state) => ({
    user_id: state.login.user_id || "",
    alerts: state.alerts
});

const mapActionCreators = {
   authUser,
   unAuthUser,
   addAlert,
   removeAlert
};

export default connect(mapStateToProps, mapActionCreators)(Login)