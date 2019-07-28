import React from "react";
import { View } from "react-native";
import HomeStyles from "../../Styles/home";
import CustomerScreen from "./customer";
import ProviderScreen from "./provider";

class LandingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: true
    };
  }
  render() {
    return (
      <View style={HomeStyles.container}>
        {this.state.customer ? <CustomerScreen /> : <ProviderScreen />}
      </View>
    );
  }
}

export default LandingScreen;
