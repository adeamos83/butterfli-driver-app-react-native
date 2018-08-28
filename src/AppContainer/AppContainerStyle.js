import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = {
   container: {
       flex: 1, 
       justifyContent: "center", 
       alignItems: "center", 
       backgroundColor: "#BE90D4"
   },
   headerLogo: {
      width: 300,
      resizeMode: 'contain'
   }

}

export default styles;