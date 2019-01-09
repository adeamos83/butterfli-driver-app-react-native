'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  Platform,
  CameraRoll,
  StyleSheet,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  View
} from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RNS3 } from 'react-native-aws3';
import { AWS_ACCESSKEY, AWS_SECRETKEY} from '../../../api';
import { getCurrentRoute } from '../../Home/modules/home';
import { updateProfilePic, setProfilePicPath} from '../../Profile/modules/profile';
import { Spinner } from '../../../Components/Common'

const refreshIcon = require('../../../Assets/img/Refresh-Icon-76x76.png');
const pictureIcon = require('../../../Assets/img/Picture-Icon-76x76.png');

const { width } = Dimensions.get('window');

const options = {
  keyPrefix: "driverImages/",
  bucket: "butterfli-driver-app-image-upload",
  region: "us-west-2",
  accessKey: AWS_ACCESSKEY,
  secretKey: AWS_SECRETKEY,
  successActionStatus: 201
}

class ProfileCamera extends Component {

	componentDidMount(){
		this.props.getCurrentRoute();
		if(Platform.OS !=='ios'){
			console.log("What is platform is running Android")
		}
		console.log("What is platform is running ", Platform.OS)
		this.props.setProfilePicPath(null);
	}

	//   static navigationOptions = {
	//     title: 'Camera Roll App'
	//   }

	constructor(props) {
		super(props);
		this.state = {
			path: null,
			modalVisible: false,
			photos: [],
			index: "",
			cameraFront: true,
			cameraState: RNCamera.Constants.Type.front,
			spinnerLoading: false
		};
	}

	renderCamera() {
		console.log("Camera Running");
		return (
			<RNCamera
			ref={(cam) => {
				this.camera = cam;
			}}
			style={styles.preview}
			type={this.state.cameraState}
			flashMode={RNCamera.Constants.FlashMode.off}
			permissionDialogTitle={'Permission to use camera'}
			permissionDialogMessage={'We need your permission to use your camera phone'}
			>
					<Text
						style={styles.cancel}
						onPress={() => Actions.profile({type: 'replace'})}
					>X
					</Text>
					<TouchableOpacity
						onPress={() => { this.toggleModal(); this.getPhotos() }}
						style = {styles.cameraRoll}
					>
						{/* 
							<Text style={{fontSize: 14}}> Library </Text>
						*/}
						<Image resizemode="container" style={styles.refreshIcon} source={pictureIcon} />
					</TouchableOpacity>
					<TouchableHighlight
						style={styles.capture}
						onPress={this.takePicture.bind(this)}
						underlayColor="rgba(255, 255, 255, 0.5)"
					>
						<View />
					</TouchableHighlight>
					<TouchableOpacity
						onPress={() => this.flipCamera()}
						style = {styles.flipCamera}
					>
						{/* 
							<Icon size={40} name="refresh" style={{color: "white"}}/> 
						*/}
						<Image resizemode="container" style={styles.refreshIcon} source={refreshIcon} />
					</TouchableOpacity>
					
				<Modal
					animationType={"slide"}
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => console.log('closed')}
				>
					<View style={styles.modalContainer}>
						<Text
							style={styles.cancelModal}
							onPress={this.toggleModal}
						> 
							X
						</Text>
						<ScrollView
						contentContainerStyle={styles.scrollView}>
							<Button
								dark
								title='Close'
								onPress={this.toggleModal}
							/>
						<View style={styles.scrollView}>
						
						{
							this.state.photos.map((p, i) => {
								return (
								<TouchableHighlight
									style={{opacity: i === this.state.index ? 0.5 : 1}}
									key={i}
									underlayColor='transparent'
									onPress={() => this.setIndex(i)}
								>
									<Image
										style={{
										width: width/3,
										height: width/3
										}}
										source={{uri: p.node.image.uri}}
									/>
								</TouchableHighlight>
								)
							})
						}
						</View>
						</ScrollView>
					</View>
				</Modal>
			</RNCamera>
		);
	}

	renderImage() {
		const { profilePicPath } = this.props
		return (
			<View>
				<Image
					source={{ uri: profilePicPath }}
					style={styles.preview}
				/>
				<Text
					style={styles.cancel}
					// onPress={() => this.setState({ path: null })}
					onPress={() => setProfilePicPath(null)}
				>X
				</Text>
				<View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
						<Button
							onPress={() => this.savePicture(profilePicPath)}
							style = {styles.saveBtn}
						>
						{ !this.state.spinnerLoading && 
							<Text style={{fontSize: 14}}> Save </Text>
								||
							<Spinner size="large"></Spinner>
						}
						</Button>
				</View>
					
			</View>
		);
	}

	render() {
		const { updateProfilePic, profilePicPath } = this.props
		return (
			<View style={styles.container}>
			{profilePicPath ? this.renderImage() : this.renderCamera()}
			</View>
			// <View style={styles.container}>
			//   <Button
			//     title='View Photos'
			//     onPress={() => { this.toggleModal(); this.getPhotos() }}
			//   />
			//   <Modal
			//     animationType={"slide"}
			//     transparent={false}
			//     visible={this.state.modalVisible}
			//     onRequestClose={() => console.log('closed')}
			//   >
			//     <View style={styles.modalContainer}>
			//       <Button
			//         title='Close'
			//         onPress={this.toggleModal}
			//       />
			//       <ScrollView
			//         contentContainerStyle={styles.scrollView}>
			//         {
			//           this.state.photos.map((p, i) => {
			//             return (
			//               <TouchableHighlight
			//                 style={{opacity: i === this.state.index ? 0.5 : 1}}
			//                 key={i}
			//                 underlayColor='transparent'
			//                 onPress={() => this.setIndex(i)}
			//               >
			//                 <Image
			//                   style={{
			//                     width: width/3,
			//                     height: width/3
			//                   }}
			//                   source={{uri: p.node.image.uri}}
			//                 />
			//               </TouchableHighlight>
			//             )
			//           })
			//         }
			//       </ScrollView>
			//     </View>
			//   </Modal>
			// </View>
		);
	}

	// render() {
	//   return (
	//     <View style={styles.container}>
	//       <RNCamera
	//           ref={ref => {
	//             this.camera = ref;
	//           }}
	//           style = {styles.preview}
	//           type={RNCamera.Constants.Type.back}
	//           flashMode={RNCamera.Constants.FlashMode.auto}
	//           permissionDialogTitle={'Permission to use camera'}
	//           permissionDialogMessage={'We need your permission to use your camera phone'}
	//           onGoogleVisionBarcodesDetected={({ barcodes }) => {
	//             console.log(barcodes)
	//           }}
	//       />
	//       <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
	//       <TouchableOpacity
	//           onPress={this.takePicture.bind(this)}
	//           style = {styles.capture}
	//       >
	//           <Text style={{fontSize: 14}}> SNAP </Text>
	//       </TouchableOpacity>
	//       </View>
	//     </View>
	//   );
	// }

	toggleModal = () => {
		this.setState({ modalVisible: !this.state.modalVisible });
		console.log("This togle state: ", this.state)
	}

	setIndex = (index) => {
		if (index === this.state.index) {
			console.log("reset index to null");
			index = null
		}
		console.log("this is the index: ", index);
		this.setState({ index:index } , () => {
			this.toggleModal();
			this.previewImage();
		});
	}

	flipCamera(){
		this.setState({cameraFront: !this.state.cameraFront})
		if(!this.state.cameraFront){
			this.setState({ cameraState: RNCamera.Constants.Type.front})
		} else {
			this.setState({ cameraState: RNCamera.Constants.Type.back})
		}
	}

  	uploadIamge(imageUri){
		var file;
		var randTag = Math.random().toString(36).slice(2)
		if(Platform.OS === 'ios'){
			file = {
				// `uri` can also be a file system path (i.e. file://)
				uri: imageUri,
				name: this.props.driverInfo._id + "-" + randTag + ".png",
				type: "image/png"
			}
		} else {
			file = {
				// `uri` can also be a file system path (i.e. file://)
				uri: imageUri,
				name: this.props.driverInfo._id + "-" + randTag + ".jpg",
				type: "image/jpg"
			}
		}
		
		console.log("this is the file image being uploaded: ", file);

		RNS3.put(file, options).then(response => {
			if (response.status !== 201)
			throw new Error("Failed to upload image to S3");
			console.log("Aws pic upload error: ");
			console.log(response);
			console.log(response.body);
			this.props.updateProfilePic(response.body.postResponse.location);
			Actions.profile({type: 'replace'})
			/**
			 * {
			 *   postResponse: {
			 *     bucket: "your-bucket",
			 *     etag : "9f620878e06d28774406017480a59fd4",
			 *     key: "uploads/image.png",
			 *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
			 *   }
			 * }
			 */
		});
  	}

	previewImage(){
		console.log("Preview state: ", this.state)
		const image = this.state.photos[this.state.index].node.image.uri
		// this.setState({ path: this.state.photos[this.state.index].node.image.uri });
		this.props.setProfilePicPath(this.state.photos[this.state.index].node.image.uri);
		console.log(image);
		console.log(this.state.photos[this.state.index]);
	}

	getPhotos = () => {
		CameraRoll.getPhotos({
			first: 1000,
			assetType: 'Photos'
		})
		.then(r => this.setState({ photos: r.edges }))
	}

	savePicture(imageUri){
		this.setState({ spinnerLoading: true})
		CameraRoll.saveToCameraRoll(imageUri, "photo");
		this.uploadIamge(imageUri);
	}

	takePicture = async function() {
		if (this.camera) {
			const options = { quality: 0.5, base64: true, fixOrientation: true};
			this.camera
			.takePictureAsync(options)
			.then(data => {
			// CameraRoll.saveToCameraRoll(data.uri, "photo");
			console.log(data);
			// this.setState({ path: data.uri });
			this.props.setProfilePicPath( data.uri )
			})
			.catch(err => {
			console.log(err);
			});
			// const data = await this.camera.takePictureAsync(options)
			// .then(res => {
			//   console.log("this is the data: ", res);
			//   CameraRoll.saveToCameraRoll(res.uri)
			// .then(console.log('Success', 'Photo added to camera roll!'))
			// })
			// console.log(data.uri);
			// CameraRoll.saveToCameraRoll(data.uri)
			// .then(console.log('Success', 'Photo added to camera roll!'))
		}
	};
}

const styles = StyleSheet.create({
	// container: {
	//   flex: 1,
	//   flexDirection: 'column',
	//   backgroundColor: 'black'
	// },
	// preview: {
	//   flex: 1,
	//   justifyContent: 'flex-end',
	//   alignItems: 'center'
	// },
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#000',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
	},
	// capture: {
	//   flex: 0,
	//   backgroundColor: '#fff',
	//   borderRadius: 5,
	//   padding: 15,
	//   paddingHorizontal: 20,
	//   alignSelf: 'center',
	//   margin: 20
	// },
	capture: {
		width: 70,
		height: 70,
		borderRadius: 35,
		borderWidth: 5,
		borderColor: '#FFF',
		marginBottom: 35,
	},
	refreshIcon:{
		height: 35,
		width: 35
	},
	pictureIcon: {
		height: 50,
		width: 50
	},
	cameraRoll:{
		//  flex: 0,
		// backgroundColor: 'white',
		// borderRadius: 5,
		// padding: 15,
		// paddingHorizontal: 20,
		//  margin: 20,
		marginBottom: 15,
		position: 'absolute',
		left: 90,
		bottom: 35,
	},
	flipCamera: {
		marginBottom: 15,
		position: 'absolute',
		right: 100,
		bottom: 35,
	},
	saveBtn:{
		width:width * 0.25,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 5,
		backgroundColor: 'white',
		margin: 20
  },
	save:{
		flex: 0,
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 15,
		paddingHorizontal: 20,
		alignSelf: 'flex-start',
		margin: 20
	},
	cancel: {
		position: 'absolute',
		left: 20,
		top: 40,
		backgroundColor: 'transparent',
		color: '#FFF',
		fontWeight: '600',
		fontSize: 24,
	},
	cancelModal: {
		// position: 'absolute',
		// left: 20,
		// top: 40,
		backgroundColor: 'transparent',
		color: 'black',
		fontWeight: '600',
		fontSize: 24,
		paddingLeft:20,
		marginBottom: 20
	},
	modalContainer: {
		paddingTop: 60,
		flex: 1
	},
	scrollView: {
		flexWrap: 'wrap',
		flexDirection: 'row'
	},
});

const mapStateToProps = (state) => ({
   driverInfo: state.profile.driverInfo || {},
	vehicleLoading: state.profile.vehicleLoading,
	profilePicPath: state.profile.profilePicPath
});

const mapActionCreators = {
	updateProfilePic, 
	getCurrentRoute,
	setProfilePicPath
};
export default connect(mapStateToProps, mapActionCreators)(ProfileCamera)
