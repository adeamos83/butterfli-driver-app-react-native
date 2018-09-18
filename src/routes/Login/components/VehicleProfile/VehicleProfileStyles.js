import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = {
   container: {
		 flex: 1,
		//  justifyContent: "center",
    	//    justifyContent: "flex-start",
    	//    alignItems: "stretch",
       padding: 20,
       backgroundColor: '#FFF'
   },
   outerContainer: {
    // padding: 10,
    marginTop: 20,
    // flexGrow: 2.5,
    justifyContent: "center",
    flex: 1
    },
   titleContainer: {
   	// padding: 10,
   	flexGrow: 2.5,
		justifyContent: "center",
      alignItems: "center",
   },
   title: {
      color: 'black',
      fontSize: 35
   },
   field: {
		borderRadius: 2,
		padding: 5,
		paddingLeft: 8,
		margin: 7,
		marginTop: 0,
		backgroundColor: '#F5F5F5',
		borderColor: "#E0E0E0",
		borderWidth: 1
   },
   textInput: {
      height: 26
   },
   buttonView: {
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'space-around',
      width:width * 0.88,
		paddingVertical: 20,
  },
  cancel:{
    width:width * 0.4,
      justifyContent: "center",
      alignItems: "center",
      borderRadius:3,
   },
   signinBtn:{
      width:width * 0.85,
	   justifyContent: "center",
		backgroundColor: "#BE90D4",
      alignItems: "center",
      borderRadius:3,
		// borderWidth: 1,
		// padding: 10,
		// margin: 10,
      // borderColor:"#fff",
  	},
  	sumbitBtnView: {
		flex: 1, 
		flexDirection: 'row', 
		justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10
	},
  	submitBtn:{
		width:width * 0.4,
		justifyContent: "center",
		backgroundColor: "#BE90D4",
		alignItems: "center",
		borderRadius:3,
	},
  	btnText: {
     fontSize: 20,
	  color: 'white',
	  fontWeight: '700'
  	},
  formError: {
     color: 'red'
  },
  logo: {
		width: 250,
		resizeMode: 'contain'
	},
}

export default styles;