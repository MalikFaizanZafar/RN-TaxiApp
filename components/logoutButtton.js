import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  BackHandler,
  Alert
} from "react-native";
import { userLogout } from "../services/userLogout";
export default class LogoutButtton extends Component {
  logUserOut() {
    userLogout().then(logoutResponse => {
      AsyncStorage.getItem("@SubQuch-User-auth").then(userAuthStatus => {
        console.log("userAuthStatus is : ", userAuthStatus);
        BackHandler.exitApp();
      });
    });
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          style={{ marginBottom: 375 }}
          onPress={() => {
            console.log("Logout");
            Alert.alert(
              "SubQuch Alert",
              "Are You Sure You want to Logout?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => this.logUserOut() }
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={{ fontWeight: "bold", marginLeft: 17 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}