import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = {
   container: {
       flex: 1,
    //    justifyContent: "flex-start",
    //    alignItems: "stretch",
       padding: 20,
       backgroundColor: '#BE90D4'
   },
   titleContainer: {
    //   padding: 10,
      alignItems: 'center',
      flexGrow: 2.5,
      justifyContent: 'center'
   },
   title: {
      color: 'white',
      fontSize: 35
   },
   field: {
      padding: 5,
      paddingLeft: 8,
      margin: 7,
      marginTop: 0,
      marginBottom: 15,
      backgroundColor: 'rgba(255,255,255,0.2)',
   },
   textInput: {
      height: 26,
   },
   buttonView: {
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'space-around',
      width:width * 0.9,
      paddingTop: 20
  },
  signup:{
      width:width * 0.3,
      justifyContent: "center",
      alignItems: "center",
    //   borderRadius:7,
    //   borderWidth: 1,
    //   borderColor:"#fff",
    backgroundColor: '#8E44AD'
   },
   signinBtn:{
      width:width * 0.3,
      justifyContent: "center",
      alignItems: "center",
    //   borderRadius:7,
    //   borderWidth: 1,
    //   borderColor:"#fff",
    backgroundColor: "#663399"
  },
  btnText: {
     fontSize: 20,
     color: 'white',
     fontWeight: '700'
  },
  formError: {
     color: 'red'
  },
  logo: {
      width: 300,
      resizeMode: 'contain'
  },
  subTitle: {
      color: '#FFF',
      marginTop: 10,
      textAlign: 'center',
      opacity: 0.9
  }
}

export default styles;