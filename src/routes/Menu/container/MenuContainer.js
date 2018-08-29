import { connect } from 'react-redux';
import Menu from '../components/menu';

import { unAuthUser } from '../../Login/modules/login';

import { authUser, 
        } from '../modules/menu';

const mapStateToProps = (state) => ({
    user_id: state.login.user_id || "",
    driverInfo: state.home.driverInfo || {},
    currentRoute: state.home.currentRoute || "",
    prevRoute: state.home.prevRoute || "",
    driverStatus: state.home.driverStatus,
});

const mapActionCreators = {
   authUser,
   unAuthUser
};

export default connect(mapStateToProps, mapActionCreators)(Menu)