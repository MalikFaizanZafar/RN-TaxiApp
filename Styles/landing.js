import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    backgroundColor: "#171616",
    flexDirection: "row",
    height: 50
  },
  topBarIcon: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  topBarLogo: {
    alignItems: "center",
    justifyContent: "center"
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#47315a"
  },
  itemText: {
    alignItems: "flex-start",
    justifyContent: "center"
  },
  itemBtn: {
    alignItems: "center",
    justifyContent: "center"
  },
  containerItems: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#171616",
    padding: 10,
    width: 180,
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
    width: 180,
    borderBottomWidth: 0.25,
    borderColor: "#03a9f4"
  },
  buttonSelectedText: {
    color: "#03a9f4"
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  icon: {
    width: 24,
    height: 24
  }
});