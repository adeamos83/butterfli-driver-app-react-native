import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width

const styles = ({
    headerContainer:{
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
        flex: 1
    },
    navTextContainer: {
        flex: 2,
        height: 50,
        paddingLeft:15,
        paddingRight:15,
        justifyContent: "flex-end"
    },
    iconButton: {
        flex:1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 5
    },
    navText: {
        fontSize: 14,
        color:"black",
    },
    btnText: {
        fontSize: 15
    },
    navIconContainer: {
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: '#F5F5F5'
    }

})

export default styles;