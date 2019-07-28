import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import HomeScreen from "./Screens/home";
import LandingScreen from "./Screens/landing";


const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Landing: LandingScreen
  },
  {
    initialRouteName: "Home",
    header: null,
    headerMode: "none"
  }
);


const switchNavigator = createSwitchNavigator(
  {
    Home: AppNavigator
  },
  {
    initialRouteName: "Home"
  }
);
const AppContainer = createAppContainer(switchNavigator);
export default AppContainer;
