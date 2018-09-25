import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');
import { addAlert, removeAlert} from '../../routes/Alert/modules/alerts';

class BaseLightbox extends Component {
  static propTypes = {
    children: PropTypes.any,
    horizontalPercent: PropTypes.number,
    verticalPercent: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      duration: 500,
      toValue: 1,
    }).start();
  }

  closeModal = () => {
    Animated.timing(this.state.opacity, {
      duration: 500,
      toValue: 0,
    }).start(Actions.pop);
    // this.props.removeAlert();
  };

  _renderLightBox = () => {
    const { children, alerts, horizontalPercent = 1, verticalPercent = 1 } = this.props;
    const height = verticalPercent ? deviceHeight * verticalPercent : deviceHeight;
    const width = horizontalPercent ? deviceWidth * horizontalPercent : deviceWidth;
    return (
      <View
        style={{
          width: 250,
          height: 175,
          justifyContent: 'center',
          alignItems: 'center',
			 backgroundColor: 'rgba(255,255,255,0.9)',
        }}
      >
        {children}
		  <Button style={styles.errorBtn}  onPress={this.closeModal}>
		 		<Text style={{fontSize: 16, color: 'white'}}>Ok</Text> 
		  </Button>
      </View>
    );
  };

  render() {
    console.log("this is the alerts", this.props.alerts);
    return <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>{this._renderLightBox()}</Animated.View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52,52,52,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorBtn:{
    width:200,
    justifyContent: "center",
    alignItems: "center",
      // borderRadius:7,
      // borderWidth: 1,
      // borderColor:"#fff",
	 backgroundColor: "#8E44AD",
	 alignSelf: 'center'
}

});

const mapStateToProps = (state) => ({
  alerts: state.alerts.alerts,
}); 

const mapActionCreators = {
  addAlert,
  removeAlert
};
export default connect(mapStateToProps, mapActionCreators)(BaseLightbox)