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
    logo: {
        // borderColor: "#ffffff",
        // borderWidth: 1,
        // marginBottom: 10,
        height: 80,
        width: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        // shadowColor: "#000",
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {
        //     height: 1,
        //     width: 0
        // }
    },
    avatarView: {
        flex: 1, 
        backgroundColor: '#BE90D4', 
        justifyContent: 'center', 
        // alignItems: 'center',
        paddingTop: 75,
        paddingLeft: 10,
        paddingBottom: 30, 
        // flexDirection: 'row',
    },
    avatarTextHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 0,
        marginVertical: 0,
        // borderColor: 'red',
        // borderWidth: 1
    },
    avatarText: {
        color: '#ecf0f1',
        fontSize: 14,
        paddingTop: 5,
        marginVertical: 0,
        // borderColor: 'red',
        // borderWidth: 1
    },
    avatarTextBottom: {
        color: '#ecf0f1',
        fontSize: 14,
        paddingTop: 5,
        marginVertical: 0,
        paddingBottom: 10,
        // borderColor: 'red',
        // borderWidth: 1
    }
})

export default styles;