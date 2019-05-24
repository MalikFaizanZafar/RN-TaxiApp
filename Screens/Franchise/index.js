import React from 'react'
import { createDrawerNavigator, DrawerItems } from "react-navigation"
import { ScrollView, SafeAreaView, View, Image } from 'react-native'
import FranchiseMainScreen from "./franchise";
import AccountScreen from '../Account';
import DrawerUserView from '../../components/DrawerUserView';
import LogoutButtton from '../../components/logoutButtton';
import MapScreen from '../Landing/map';

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
    <LogoutButtton />
  </SafeAreaView>
)
export const FranchiseDrawerNavigator = createDrawerNavigator(
  {
    Landing: {
      screen: FranchiseMainScreen
    },
    Account: {
      screen: AccountScreen
    },
    Map : {
      screen: MapScreen
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