import React from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { MyDrawerNavigator } from "./Screens/Landing/landing";

import { GoogleSignin, GoogleSigninButton, statusCodes } from "react-native-google-signin";
import { LoginButton, AccessToken } from "react-native-fbsdk";

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
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    };
  }
  componentDidMount(){
    console.log(" componentDidMount ");
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      webClientId: "895935298518-8apvnm51q2vj6ivbm6pbqj7ma5v7dsq9.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: "", // specifies a hosted domain restriction
      loginHint: "", // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: "" // [Android] specifies an account name on the device that should be used
    });
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfo :  ", userInfo.user);
      this.setState({ userInfo });
      this.props.navigation.navigate("Landing")
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View>
            <Image
              style={{ width: 250, height: 70 }}
              source={require("./assets/subquch.png")}
            />
          </View>
          <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
            <LoginButton
              style={{ width: 230, height: 30 }}
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log("login has error: " + result.error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    console.log(data.accessToken.toString());
                  });
                }
              }}
              onLogoutFinished={() => console.log("logout.")}
            />
            <GoogleSigninButton
              style={{ width: 237, height: 35, marginTop: 10, elevation: 0 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this.signIn}
            />
          </View>
          <View style={{ marginTop: 8 }}>
            {/* <Button
              color="red"
              title="Login With Google"
              style={styles.btnGoogle}
              onPress={() => this.props.navigation.navigate("Landing")}
            /> */}
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
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
