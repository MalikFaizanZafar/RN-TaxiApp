import React from "react";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import {
  ScrollView,
  SafeAreaView,
  View,
  AsyncStorage,
  Text,
  TouchableOpacity
} from "react-native";
import LandingScreen from "./landing";
import AccountScreen from "../Account";
import DrawerUserView from "../../components/DrawerUserView";
import { userLogout } from "../../services/userLogout";

const customDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 150,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 10
      }}
    >
     <DrawerUserView />
    </View>
    <ScrollView style={{height: 200}}>
      <DrawerItems {...props} />
    </ScrollView>
    <TouchableOpacity style={{ marginBottom: 320}} onPress={() => {
        console.log("Logout")
        userLogout().then(logoutResponse => {
          AsyncStorage.getItem("@SubQuch-User-auth").then(userAuthStatus => {
            console.log("userAuthStatus is : ", userAuthStatus)
          })
        })
      }}>
      <Text style={{ fontWeight: "bold", marginLeft: 17 }}>Logout</Text>
      </TouchableOpacity>
  </SafeAreaView>
);
export const MyDrawerNavigator = createDrawerNavigator(
  {
    Landing: {
      screen: LandingScreen
    },
    Account: {
      screen: AccountScreen
    }
  },
  {
    contentComponent: customDrawerComponent,
    backgroundColor: "green",
    drawerWidth: 200,
    initialRouteName: "Landing",
    drawerLockMode: 'locked-closed'
  }
);
