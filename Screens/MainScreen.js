import React from "react";
import {
  AsyncStorage,View
} from "react-native";
import LandingScreen from "./Landing/landing";
import HomeScreen from "./home";

export default class MainScreen extends React.Component {

  state = {
    userAuthStatus : "0"
  }
  async componentWillMount(){
    let subquch_user = await AsyncStorage.getItem('@SubQuch-User-auth')
    console.log('@SubQuch-User-auth : ', subquch_user)
    if(subquch_user){
      this.setState({
        userAuthStatus : subquch_user
      })
      // this.props.navigation.navigate("Landing");
    }
  }

  render() {
    return (
      <View>
        if(this.state.userAuthStatus === "1"){
          <LandingScreen />
        }else {
          <HomeScreen />
        }
      </View>
    );
  }
}
