import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, ScrollView } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getCurrentRoute } from '../../../Home/modules/home';
import { getRideHistory } from '../../modules/profile';

class RideHistoryContainer extends React.Component { 
	componentDidMount(){
		this.props.getCurrentRoute();
		this.props.getRideHistory();
	}

	render() {
		const { bookingDetails, rideHistory } = this.props
		const { firstName, lastName, tripDistance, tripDuration, bookingCompletedAt} = bookingDetails || {}
		console.log("this is the ride history", rideHistory);
		return (
			<Container>
					<View style={{borderBottomWidth: 2, borderColor: '#ECECEC', marginBottom: 20, alignItems: "center"}}>
						<Text style={{fontSize: 16, fontWeight: "700", marginTop: 20, marginBottom: 15}}>Ride History</Text>
					</View>
					<Content>
						<List 
						dataArray={rideHistory} 
						renderRow={(item) =>
							<ListItem avatar style={{paddingBottom: 10}}>
							<Left>
								{ item.profilePic &&
									<Thumbnail source={{ uri: item.profilePic }} />
									||
									<Icon name="user-circle-o" style={{ color: "#fff", fontSize: 50, opacity: 5}} />
								}
							</Left>
							<Body>
								<Text>{item.firstName + " " + item.lastName}</Text>
								{ item.tripDistance[0] &&
									<Text note>
										{item.tripDistance[0].totalMiles + "mi"}
										<View style={{paddingHorizontal: 5}}>
											<Icon name="circle" style={{ color: "#ccc", fontSize: 8, opacity: 5}} />
										</View>
										{item.tripDistance[0].totalTime + "m"}
									</Text>
								}
							</Body> 
							<Right>
								<Text note>8/27/18 3:43 PM</Text>
							</Right>
							</ListItem>
						}
						/>
					</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
   driverInfo: state.profile.driverInfo || {},
   user_id: state.home.user_id,
   rideHistory: state.profile.rideHistory || {},
   bookingDetails: state.home.bookDetails || {}
});

const mapActionCreators = {
	getCurrentRoute,
	getRideHistory
};
export default connect(mapStateToProps, mapActionCreators)(RideHistoryContainer)