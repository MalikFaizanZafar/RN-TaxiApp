import React from 'react'
import { createDrawerNavigator, DrawerItems } from "react-navigation"
import { ScrollView, SafeAreaView, View, Image } from 'react-native'
import ItemMainScreen from "./item";
import AccountScreen from '../Account';
import DrawerUserView from '../../components/DrawerUserView';
import LogoutButtton from '../../components/logoutButtton';

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
      <LogoutButtton />
    </ScrollView>
  </SafeAreaView>
)

export const ItemDrawerNavigator = createDrawerNavigator(
  {
    Landing: {
      screen: ItemMainScreen
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