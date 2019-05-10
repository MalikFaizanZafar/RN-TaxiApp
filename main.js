import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { AsyncStorage } from "react-native";
import { MyDrawerNavigator } from "./Screens/Landing/landing";
import HomeScreen from "./Screens/home";

_bootstrapAsync = async () => {
  const subquchUser = await AsyncStorage.getItem("SubQuch_User");
  console.log("subquchUser is : ", subquchUser)
  return subquchUser;
};

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
    Landing: AppNavigatorTwo
  },
  {
    initialRouteName: _bootstrapAsync? "Landing" : "Home"
  }
);
const AppContainer = createAppContainer(switchNavigator);
export default AppContainer;
