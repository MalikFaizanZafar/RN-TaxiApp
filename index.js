import React from "react";
import { AppRegistry, StyleSheet, Text, View, Button } from "react-native";
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { MyDrawerNavigator } from "./Screens/Landing/landing";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  welcomeText: {
    color: "red",
    marginBottom: 10
  },
  innerContainer: {
    padding: 10
  },
  btnGoogle: {
    color: "black"
  }
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome To Second Project App</Text>
        <View style={styles.innerContainer}>
          <View>
            <Button
              title="Login With Facebook"
              onPress={() => this.props.navigation.navigate("Landing")}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <Button
              color="red"
              style={{ marginTop: 20 }}
              title="Login With Google"
              style={styles.btnGoogle}
              onPress={() => this.props.navigation.navigate("Landing")}
            />
          </View>
        </View>
      </View>
    );
  }
}
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
AppRegistry.registerComponent('SubQuch', () => HomeScreen)
export default createAppContainer(AppNavigator);
