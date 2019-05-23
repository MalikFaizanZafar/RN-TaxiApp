import React from 'react'
import { createDrawerNavigator, DrawerItems } from "react-navigation"
import { ScrollView, SafeAreaView, View, Image } from 'react-native'
import LandingScreen from "./landing"
import AccountScreen from '../Account';

const customDrawerComponent = (props) => (
  <SafeAreaView style={{flex : 1}}>
    <View style={{ height: 150, backgroundColor: 'white', justifyContent: "center", alignItems: "center"}}>
      <Image source={require('../../assets/cart.jpg')} style={{height: 120, width:120, borderRadius: 60 }} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)
export const MyDrawerNavigator = createDrawerNavigator(
  {
    Landing: {
      screen: LandingScreen
    },
    Account: {
      screen: AccountScreen
    },
  },
  {
    contentComponent: customDrawerComponent,
    backgroundColor: "green",
    drawerWidth: 200,
    initialRouteName: "Landing"
  }
);