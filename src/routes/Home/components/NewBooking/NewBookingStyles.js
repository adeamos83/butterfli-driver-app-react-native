import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const styles = {
    newBookingContainer:{
        flex:1,
        backgroundColor:"#DCC6E0",
        justifyContent: "center",
        // alignItems: "center",
        // paddingTop: 30
    },
    tabText: {
        fontSize: 12
    },
    subTabText: {
        fontSize: 8
    },
    spinner: {
        marginBottom: 100
    },
    btn: {
        marginTop: 20
    },
    text: {
        color: "white",
        fontSize:16,
        marginBottom:15,
        // marginTop:15
    },
    locationIcon:{
        color: "#fff",
        fontSize: 40,
        marginVertical:15
    },
    content:{
        // position: "absolute",
        // flex:1,
        // top: 30,
        // left: 0,
        // right: 0,
        // bottom: 0,
        // flex:1,
        // height: height,
        justifyContent:"center",
        alignItems:"center",
        // borderColor: 'red',
        // borderWidth: 1,
        // alignSelf: 'center'
    },
    pickup:{
        width:width * 0.9,
        borderRadius:7,
        height:40,
        backgroundColor:"#fff",
        // marginTop:220,
        justifyContent: "center",
        alignItems: "center"

    },
    toArrow:{
        color:"#fff",
        fontSize:16,
        marginTop:10,
    },
    dropoff:{
        width:width * 0.9,
        borderRadius:7,
        height:40,
        backgroundColor:"#fff",
        marginTop:10,
        justifyContent: "center",
        alignItems: "center"

    },
    cancelBtnWrapper:{
        marginTop:15,
        width:width * 0.9,
        justifyContent: "center",
        alignItems: "center"
    },
    cancelBtn:{
        width:width * 0.3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0,
        // borderWidth: 1,
        // borderColor:"#fff",
        backgroundColor:"#FF1744"
    },
    cancelBtnText:{
        color: "#fff",
    },
    acceptBtn:{
        width:width * 0.3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0,
        // borderWidth: 1,
        // borderColor:"#fff",
        backgroundColor:"#663399"
    },
    accpetBtnText:{
        color: "#fff",
    },
    buttonView: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-around',
        width:width * 0.9,
        marginTop: 15
    },
    termsText:{
        color:"#fff",
        textAlign:"center",
        fontSize:14,
        marginBottom:15

    }
};

export default styles;