import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
    icon:{
        color: "#fff",
        fontSize: 75,
        opacity: 5
    },
    driverPic: {
        borderColor: "#ffffff",
        borderWidth: 1,
        height: 150,
        width: 150,
        borderRadius: 75,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
})

export default styles;