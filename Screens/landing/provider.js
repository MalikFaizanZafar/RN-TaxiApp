import React from "react";
import { View, Text } from "react-native";
import HomeStyles from "../../Styles/home";

class ProviderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={HomeStyles.container}>
        <Text>Welcome Provider!</Text>
      </View>
    );
  }
}

export default ProviderScreen;
