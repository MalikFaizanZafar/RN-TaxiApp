import React from "react";
import { View, ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import HomeStyles from "../../Styles/home";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: true
    };
  }

  render() {
    return (
      <View style={HomeStyles.container}>
        <ImageBackground
          source={require("./../../assets/app-bg.jpg")}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ marginTop: 10 }}>
            <Button
              containerStyle={{ width: 200, marginTop: 50 }}
              buttonStyle={{ backgroundColor: "#23225C" }}
              title="I am Customer"
              onPress={() => this.props.navigation.navigate("Landing")}
            />
            <Button
              containerStyle={{ width: 200, marginTop: 10 }}
              buttonStyle={{ backgroundColor: "#23225C" }}
              title="I am Provider"
              onPress={() => this.props.navigation.navigate("Landing")}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default HomeScreen;
