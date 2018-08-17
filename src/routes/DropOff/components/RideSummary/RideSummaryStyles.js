//Driver Found Styles.js
import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const styles = {
    findDriverContainer:{
      flex:1,
      backgroundColor:"#000",
      justifyContent: "center",
      alignItems: "center",
      // position:"absolute",
      // height:height,
      // width:width,
      opacity:0.9,
      // right: 0,
    },
    rideheader:{
      backgroundColor: "#663399", 
      height: height* 0.1,
      width:width, 
      justifyContent: "center",
      alignItems: "center"
    },
    riderHeaderText: {
      fontSize: 18,
      fontWeight: "600",
      color: "white" 
    },
    detailsHeader: {
      paddingTop: 15,
      fontSize: 16,
      color: "#546E7A",
      paddingLeft: 15
    },
    routeContainer:{
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 15,
      backgroundColor: "white", 
      height: height* 0.1,
      width:width, 
      justifyContent: "flex-start",
      flexDirection: "row"
      // alignItems: "center"
    },
    iconContainer:{
      // padding: 10,
      // paddingTop: 10,
      // paddingBottom: 10,
      paddingRight: 10,
      justifyContent: "center",
      alignItems: "center",
      // borderColor: "red",
      // borderWidth: 1
    },
    locationIcon:{
      color: "#663399",
      fontSize: 25
    },
    clockIcon:{
      color: "#663399",
      fontSize: 20
    },
    routeHeader:{
      fontWeight: "500",
      fontSize: 16,
      color: "black"
    },
    routeText:{
      paddingTop: 5,
      color: "#9E9E9E"
    },
    icon:{
      color: "#fff",
      fontSize: 75,
      opacity: 5
   },
   buttonContainer: {
      width: width,
      paddingTop: 0,
      paddingBottom: 5,
      justifyContent: "center",
      flexDirection:"row",
   },
   navButton: {
         width: width,
         justifyContent: "center",
         borderRadius: 0,
         backgroundColor: "#CE93D8"
   },
   btnText: {
         fontSize: 20,
         color:"#fff",
         fontWeight: "bold",
   },
    content:{
      //   position: "absolute",
        flex:1,
      //   top: 0,
      //   left: 0,
      //   right: 0,
      //   bottom: 0,
        justifyContent:"center",
        alignItems:"center"
    }
};

export default styles;