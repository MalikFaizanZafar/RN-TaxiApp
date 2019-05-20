import { createDrawerNavigator } from "react-navigation";
import MapScreen from "../Landing/map";
import MapScreenTwo from "../Landing/mapTwo";
import ItemMainScreen from "./item";

export const ItemDrawerNavigator = createDrawerNavigator(
  {
    Landing: {
      screen: ItemMainScreen
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