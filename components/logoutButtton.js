import React, { Component } from "react";
import { View, TouchableOpacity, Text, AsyncStorage, BackHandler } from "react-native";
import { userLogout } from "../services/userLogout";
export default class LogoutButtton extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          style={{ marginBottom: 320 }}
          onPress={() => {
            console.log("Logout");
            userLogout().then(logoutResponse => {
              AsyncStorage.getItem("@SubQuch-User-auth").then(
                userAuthStatus => {
                  console.log("userAuthStatus is : ", userAuthStatus);
                  BackHandler.exitApp()
                }
              );
            });
          }}
        >
          <Text style={{ fontWeight: "bold", marginLeft: 17 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
