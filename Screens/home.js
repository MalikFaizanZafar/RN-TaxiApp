import React from "react";
import { View, Text } from "react-native";
import HomeStyles from "../Styles/home";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    modalVisible: false,
    signupLoading: false
  };
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      phone: "",
      gender: "",
      birthday: "",
      modalVisible: false,
      AuthButtonsVisible: false,
      fbAuthLoading: false,
      googleAuthLoading: false
    };
  }
  render() {
    return (
      <View style={HomeStyles.container}>
        <Text>Welcome to Taxi App</Text>
      </View>
    );
  }
}

export default HomeScreen;
