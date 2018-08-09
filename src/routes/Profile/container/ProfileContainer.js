import { connect } from 'react-redux';
import Profile from '../components/profile';

import { } from '../modules/profile';

const mapStateToProps = (state) => ({
   driverInfo: state.home.driverInfo || {},
});

const mapActionCreators = {
};

export default connect(mapStateToProps, mapActionCreators)(Profile)