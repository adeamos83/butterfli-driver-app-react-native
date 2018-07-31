import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = {
   container: {
       flex: 1,
       flexDirection: 'row',
       padding: 16,
       backgroundColor: '#f2dede',
       borderColor: '#ebccd1',
       borderTopWidth: 2
   },
   text: {
      color: '#a94442'
   },
}

export default styles;