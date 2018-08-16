import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
   container: {
      flex: 1,
   //    justifyContent: "flex-start",
   //    alignItems: "stretch",
      padding: 20,
      backgroundColor: '#FFF'
  },
   textRow:{
        marginBottom: 10,
        flexDirection: 'row'
    },
    infoText: {
       fontSize: 14
    },
    heading: {
        fontWeight: '600',
        fontSize: 14
    },
    row: {
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 10
    },
    innerCol: {
        marginLeft: 20,
        marginRight: 15,
        flex:1, 
    },
    innerColLg: {
        marginLeft: 10,
        marginRight: 10,
        flex:3, 
        borderBottomWidth: 2,
        borderColor: '#ECECEC'
    },
    avatarHeader:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        paddingVertical: 15,
        marginLeft: 10 
    },
    icon:{
        color: "#fff",
        fontSize: 75,
        opacity: 5
    },
    driverPic: {
        borderColor: "#ffffff",
        borderWidth: 1,
        height: 100,
        width: 100,
        borderRadius: 50,
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
    imageContainer : {
        flex: 1, 
        height: 100, 
        width: 100, 
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#ffffff",
        overflow: "hidden",
    },
    vehiclePic: {
        borderColor: "#ffffff",
        borderWidth: 1,
        height: '100%',
        width: '100%',
        // borderRadius: 50,
        alignSelf: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
})

export default styles;