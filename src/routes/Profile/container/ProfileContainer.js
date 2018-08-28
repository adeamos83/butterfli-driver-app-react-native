import { connect } from 'react-redux';
import Profile from '../components/profile';

import { getCurrentRoute } from '../../Home/modules/home';

const mapStateToProps = (state) => ({
   driverInfo: state.home.driverInfo || {},
   user_id: state.home.user_id,
});

const mapActionCreators = {
   getCurrentRoute
};

export default connect(mapStateToProps, mapActionCreators)(Profile)