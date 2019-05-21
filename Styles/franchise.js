import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },
  topCard: {
    justifyContent: "center",
    alignItems: "center"
  },
  cardInfoSection: {
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#171616",
    padding: 10,
    width: 120,
    // borderWidth: 0.15,
    borderColor: "#fff"
  },
  buttonText: {
    color: "#fff"
  },
  buttonSelected: {
    alignItems: "center",
    backgroundColor: "#171616",
    padding: 10,
    width: 120,
    // borderBottomWidth: 0.25,
    borderColor: "#03a9f4"
  },
  buttonSelectedText: {
    color: "#03a9f4"
  },
});