import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { AsyncStorage } from "react-native";
import { MyDrawerNavigator } from "./Screens/Landing";
import HomeScreen from "./Screens/home";
import { FranchiseDrawerNavigator } from "./Screens/Franchise";
import { ItemDrawerNavigator } from "./Screens/Item";
import { userAuthStatus } from "./services/userAuth";
import { CartDrawerNavigator } from "./Screens/Cart";

_bootstrapAsync = () => {
  let user = "";
  AsyncStorage.getItem("@SubQuch-User").then(data => {
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
    Landing: MyDrawerNavigator,
    Franchise: FranchiseDrawerNavigator,
    Item: ItemDrawerNavigator,
    Cart: CartDrawerNavigator
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
    initialRouteName: userAuthStatus?"Landing": "Home"
  }
);
const AppContainer = createAppContainer(switchNavigator);
export default AppContainer;
