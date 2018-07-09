import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width

const styles = ({
    footerContainer:{
        backgroundColor: "white"
    },
    subText: {
        fontSize: 8
    },
    buttonContainer: {
        width: width * 0.9,
        paddingTop: 5,
        paddingBottom: 5
    },
    navButton: {
        width: width * 0.8
    },
    btnText: {
        fontSize: 16,
        color:"#fff",
    },

})

export default styles;