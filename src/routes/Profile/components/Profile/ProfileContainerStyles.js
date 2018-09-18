import { StyleSheet, Dimensions} from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
   container: {
      flex: 1,
   //    justifyContent: "flex-start",
   //    alignItems: "stretch",
    //   paddingTop: 55,
      backgroundColor: '#FFF'
  },
   textRow:{
        marginBottom: 10,
        flexDirection: 'row'
    },
    infoText: {
       fontSize: 14
    },
    editRow: {
        justifyContent: 'space-between',
        width:width * 0.85,
        flexDirection: "row",
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
    },
    buttonView: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-around',
        width:width * 0.9,
        paddingTop: 20
    },
    signinBtn:{
        width:width * 0.3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#663399"
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '700'
    },
    editBtn:{
        width:width * 0.2,
        borderColor: "#D9D5DC",
        justifyContent: "center",
        padding: 0
    },
    field: {
        justifyContent: "center",

    }
})

export default styles;