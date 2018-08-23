import { connect } from 'react-redux';
import Profile from '../components/profile';

import { getCurrentRoute } from '../../Home/modules/home';

const mapStateToProps = (state) => ({
   driverInfo: state.home.driverInfo || {},
});

const mapActionCreators = {
   getCurrentRoute
};

export default connect(mapStateToProps, mapActionCreators)(Profile)