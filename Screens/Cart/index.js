import { createDrawerNavigator } from "react-navigation";
import MapScreen from "../Landing/map";
import MapScreenTwo from "../Landing/mapTwo";
import CartMainScreen from "./cart";

export const CartDrawerNavigator = createDrawerNavigator(
  {
    Landing: {
      screen: CartMainScreen
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