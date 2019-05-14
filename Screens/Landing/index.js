import { createDrawerNavigator } from "react-navigation";
import LandingScreen from "./landing";
import MapScreen from "./map";
import MapScreenTwo from "./mapTwo";

export const MyDrawerNavigator = createDrawerNavigator(
  {
    Landing: {
      screen: LandingScreen
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