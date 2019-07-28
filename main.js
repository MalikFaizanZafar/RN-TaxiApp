import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import HomeScreen from "./Screens/home";
import CustomerScreen from "./Screens/home/customer";
import ProviderScreen from "./Screens/home/provider";


const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Customer: CustomerScreen,
    Provider: ProviderScreen
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
