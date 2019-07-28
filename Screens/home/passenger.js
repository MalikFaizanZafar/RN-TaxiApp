import React from "react";
import { View, Text } from "react-native";
import HomeStyles from "../../Styles/home";

class PassengerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={HomeStyles.container}>
        <Text>Welcome Passenger!</Text>
      </View>
    );
  }
}

export default PassengerScreen;
