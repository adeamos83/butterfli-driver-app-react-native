import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width

const styles = ({
    headerContainer:{
        backgroundColor: "#2d3436",
        justifyContent: "center",
        paddingLeft:15,
        paddingRight:15,
        height: 50,
        width: width * 0.85,
        position: "absolute",
        top: 70,
        left:40,
    },
    subText: {
        fontSize: 8,
        color: "white"
    },
    innerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    navTextContainer: {
        flex: 2,
        height: 40,
        paddingLeft:10,
        paddingRight:10,
        justifyContent: "flex-end",
    },
    iconButton: {
        flex:1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 0
    },
    navText: {
        fontSize: 14,
        color:"white",
        fontWeight: "bold",
    },
    navTextOverview: {
        fontSize: 14,
        color:"white",
        fontWeight: "bold",
        textAlign: "center"
    },
    btnText: {
        fontSize: 15
    },
    navIconContainer: {
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: '#212121',
        justifyContent: "flex-end",
    }

})

export default styles;