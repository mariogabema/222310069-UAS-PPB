import { StyleSheet, TouchableOpacity } from "react-native";

const ButtonPrimary = ({ children, ...others }) => {
  return (
    <TouchableOpacity style={styles.btnStyle} {...others} >{children}</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    btnStyle: {
      backgroundColor: "#ffffff",
      padding: 15,
      marginVertical: 10,
      borderRadius: 30,
    },
  });
  

export { ButtonPrimary};