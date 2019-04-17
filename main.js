import { createStackNavigator, createAppContainer } from "react-navigation";
import { MyDrawerNavigator } from "./Screens/Landing/landing";
import HomeScreen from "./Screens/home";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Landing: MyDrawerNavigator
  },
  {
    initialRouteName: "Home",
    header: null,
    headerMode: "none"
  }
);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
