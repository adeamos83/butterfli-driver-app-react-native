import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
    icon:{
        color: "#fff",
        fontSize: 75,
        opacity: 5
    },
    driverPic: {
        // borderColor: "#ffffff",
        // borderWidth: 1,
        marginBottom: 10,
        height: 80,
        width: 80,
        borderRadius: 40,
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
    avatarView: {
        flex: 1, 
        backgroundColor: '#BE90D4', 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingLeft: 10
    },
    avatarText: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default styles;