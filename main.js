import React from "react";
import {StyleSheet, Text, View, Button, Image } from "react-native";
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
        <View style={styles.innerContainer}>
          <View>
            <Image style={{width: 250, height: 70}} source={require('./assets/subquch.png')}></Image>
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              title="Login With Facebook"
              onPress={() => this.props.navigation.navigate("Landing")}
            />
          </View>
          <View style={{ marginTop: 8 }}>
            <Button
              color="red"
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
// AppRegistry.registerComponent('SubQuch', () => AppNavigator)
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;