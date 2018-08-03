import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = {
   container: {
       flex: 1,
       justifyContent: "flex-start",
       alignItems: "stretch",
       padding: 20,
       backgroundColor: '#aaa'
   },
   titleContainer: {
      padding: 10
   },
   title: {
      color: 'white',
      fontSize: 35
   },
   field: {
      borderRadius: 5,
      padding: 5,
      paddingLeft: 8,
      margin: 7,
      marginTop: 0,
      backgroundColor: 'white'
   },
   textInput: {
      height: 26
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
      borderRadius:7,
      borderWidth: 1,
      borderColor:"#fff",
   },
   signinBtn:{
      width:width * 0.3,
      justifyContent: "center",
      alignItems: "center",
      borderRadius:7,
      borderWidth: 1,
      borderColor:"#fff",
  },
  btnText: {
     fontSize: 20,
     color: 'white'
  },
  formError: {
     color: 'red'
  }
}

export default styles;