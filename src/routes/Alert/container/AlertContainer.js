import { connect } from 'react-redux';
import Alert from '../components/alerts';

import { addAlert, 
        removeAlert, 
        } from '../modules/alerts';

const mapStateToProps = (state) => ({
    alerts: state.alerts.alerts,
});

const mapActionCreators = {
    addAlert,
    removeAlert
};

export default connect(mapStateToProps, mapActionCreators)(Alert)