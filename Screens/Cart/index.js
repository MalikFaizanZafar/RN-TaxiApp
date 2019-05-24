import React from 'react'
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import { ScrollView, SafeAreaView, View, Image } from 'react-native'
import CartMainScreen from "./cart";
import AccountScreen from '../Account';
import DrawerUserView from '../../components/DrawerUserView';

const customDrawerComponent = (props) => (
  <SafeAreaView style={{flex : 1}}>
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
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

export const CartDrawerNavigator = createDrawerNavigator(
  {
    Landing: {
      screen: CartMainScreen
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