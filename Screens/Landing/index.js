import React from "react";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import {
  ScrollView,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import LandingScreen from "./landing";
import AccountScreen from "../Account";
import DrawerUserView from "../../components/DrawerUserView";

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
    {/* <TouchableOpacity style={{ marginBottom: 450}} onPress={() => {
        console.log("Logout")
      }}>
      <Text style={{ fontWeight: "bold", marginLeft: 17 }}>Logout</Text>
      </TouchableOpacity> */}
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
    initialRouteName: "Landing"
  }
);
