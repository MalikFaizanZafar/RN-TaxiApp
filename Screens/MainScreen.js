import React from "react";
import {
  AsyncStorage,View
} from "react-native";
import LandingScreen from "./Landing/landing";
import HomeScreen from "./home";

export default class MainScreen extends React.Component {

  state = {
    user : null
  }
  async componentWillMount(){
    let subquch_user = await AsyncStorage.getItem('SubQuch_User')
    console.log('subquch_user : ', subquch_user)
    if(subquch_user){
      this.setState({
        user : subquch_user
      })
      // this.props.navigation.navigate("Landing");
    }
  }

  render() {
    return (
      <View>
        if(this.state.user){
          <LandingScreen />
        }else {
          <HomeScreen />
        }
      </View>
    );
  }
}
