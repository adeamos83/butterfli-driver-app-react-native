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
    timeContainer: {
        flex: 1,
        height: 50,
        paddingLeft:15,
        paddingRight:15,
        justifyContent: "center",
    },
    iconButton: {
        flex:1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    timeText: {
        fontSize: 16,
        color:"red",
        textAlign: "right"
    },
    nameText: {
        fontSize: 16,
        color:"blue",
    },
    routeText: {
        fontSize: 15,
        color:"green",
        fontWeight: "bold"
    },
    btnText: {
        fontSize: 15
    },
    navIconContainer: {
        flex: 1,
        height: "100%",
        justifyContent: "center"
    }

})

export default styles;