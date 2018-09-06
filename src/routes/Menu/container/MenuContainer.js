import { connect } from 'react-redux';
import Menu from '../components/menu';

import { unAuthUser } from '../../Login/modules/login';
import { getDriverStatus,cancelBookingRequest } from '../../Home/modules/home';
import { authUser, 
        } from '../modules/menu';

const mapStateToProps = (state) => ({
    user_id: state.login.user_id || "",
    driverInfo: state.profile.driverInfo || {},
    currentRoute: state.home.currentRoute || "",
    prevRoute: state.home.prevRoute || "",
    driverStatus: state.home.driverStatus,
});

const mapActionCreators = {
   authUser,
   unAuthUser,
   cancelBookingRequest,
   getDriverStatus
};

export default connect(mapStateToProps, mapActionCreators)(Menu)