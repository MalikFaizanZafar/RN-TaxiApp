import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { AsyncStorage } from "react-native";
import { MyDrawerNavigator } from "./Screens/Landing/landing";
import HomeScreen from "./Screens/home";

_bootstrapAsync = () => {
  let user = "";
  AsyncStorage.getItem("@SubQuch-User")
  subquchPromise.then(data => {
    user = data
  })
  console.log("subquchUser is : ", subquchUser)
  return user.length == 0? true : false;
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
    initialRouteName: "Home"
  }
);
const AppContainer = createAppContainer(switchNavigator);
export default AppContainer;
