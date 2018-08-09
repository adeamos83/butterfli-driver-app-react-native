import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = {
   field: {
      borderRadius: 5,
      padding: 5,
      paddingLeft: 8,
      margin: 7,
      marginTop: 0,
      backgroundColor: 'white'
   },
   textInput: {
      height: 26,
      color: 'white'
   },
   formError: {
      color: 'red'
   }
}

export default styles;