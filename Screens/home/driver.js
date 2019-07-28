import React from "react";
import { View, Text } from "react-native";
import HomeStyles from "../../Styles/home";

class DriverScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={HomeStyles.container}>
        <Text>Welcome Driver!</Text>
      </View>
    );
  }
}

export default DriverScreen;
