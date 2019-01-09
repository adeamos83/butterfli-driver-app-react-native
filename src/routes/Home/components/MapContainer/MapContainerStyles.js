import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: 50
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
}

export default styles;