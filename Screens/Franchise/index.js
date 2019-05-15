import { createDrawerNavigator } from "react-navigation";
import MapScreen from "../Landing/map";
import MapScreenTwo from "../Landing/mapTwo";
import FranchiseMainScreen from "./franchise";

export const FranchiseDrawerNavigator = createDrawerNavigator(
  {
    Landing: {
      screen: FranchiseMainScreen
    },
    Map: {
      screen: MapScreen
    },
    MapTwo: {
      screen: MapScreenTwo
    }
  },
  {
    backgroundColor: "green",
    drawerWidth: 200,
    initialRouteName: "Landing"
  }
);