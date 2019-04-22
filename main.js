import { createSwitchNavigator,createStackNavigator, createAppContainer } from "react-navigation";
import { MyDrawerNavigator } from "./Screens/Landing/landing";
import HomeScreen from "./Screens/home";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    initialRouteName: "Home",
    header: null,
    headerMode: "none"
  }
);
const AppNavigatorTwo = createStackNavigator(
  {
    Landing: MyDrawerNavigator
  },
  {
    initialRouteName: "Landing",
    header: null,
    headerMode: "none"
  }
);

const switchNavigator = createSwitchNavigator(
  {
    Home: AppNavigator,
    Landing: AppNavigatorTwo,
  },
  {
    initialRouteName: 'Home',
  }
)
const AppContainer = createAppContainer(switchNavigator);
export default AppContainer;
