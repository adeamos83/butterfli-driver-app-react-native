import { connect } from 'react-redux';
import Menu from '../components/menu';

import { authUser, 
         unAuthUser, 
        } from '../modules/menu';

const mapStateToProps = (state) => ({
    user_id: state.login.user_id || "",
    driverInfo: state.home.driverInfo || {},
    currentRoute: state.home.currentRoute || "",
    prevRoute: state.home.prevRoute || ""
});

const mapActionCreators = {
   authUser,
   unAuthUser
};

export default connect(mapStateToProps, mapActionCreators)(Menu)