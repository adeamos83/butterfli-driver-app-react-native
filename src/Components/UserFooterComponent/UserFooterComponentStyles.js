import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width

const styles = ({
    footerContainer:{
        backgroundColor: "white",
        justifyContent: "center",
        paddingLeft:15,
        paddingRight:15,
        height: 70,
    },
    subText: {
        fontSize: 8
    },
    innerContainer: {
        width: width * 0.95,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    navTextContainer: {
        flex: 1,
        height: 50,
        paddingLeft:15,
        paddingRight:15,
        justifyContent: "center"
    },
    iconButton: {
        flex:1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    navText: {
        fontSize: 14,
        color:"black",
    },
    routeText: {
        fontSize: 14,
        color:"green",
    },
    btnText: {
        fontSize: 15
    },
    navIconContainer: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor:"black",
        borderLeftWidth: 1,
        borderLeftColor:"black",
        borderTopWidth: 1,
        borderTopColor:"black",
        borderBottomWidth: 1,
        borderBottomColor:"black",
        height: "100%"
    }

})

export default styles;