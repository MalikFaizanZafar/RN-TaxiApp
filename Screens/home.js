import React from "react";
import { ActivityIndicator, View, Text, Image, Alert } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import { storeUserData } from "../services/signUser";
import { googleConfig } from "../configs/googleConfig";
import HomeStyles from "../Styles/home";
import { userAuthStatus } from "../services/userAuth";
import { userRegistered } from "../services/userRegistered";
import FacebookAuthButton from "../components/FacebookAuthButton";
import UserMoreInfoDialog from "../components/UserMoreInfoDialog";
import { Button } from "react-native-elements";

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
      AuthButtonsVisible: false
    };
  }
  componentDidMount() {
    GoogleSignin.configure(googleConfig);
    userAuthStatus()
      .then(userAtuh => {
        this.props.navigation.navigate("Landing");
      })
      .catch(authFalse => {
        this.setState({
          AuthButtonsVisible: true
        });
      });
  }
  signIn = async () => {
    this.setState({ AuthButtonsVisible: false });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      let googleUser = {
        socialId: userInfo.user.id,
        password: "1234",
        token: userInfo.accessToken,
        name: userInfo.user.name,
        email: userInfo.user.email,
        photo: userInfo.user.photo,
        verified: false,
        provider: "GOOGLE"
      };
      userRegistered(googleUser.email)
        .then(user => {
          // console.log("Google user is  : ", user);
          this.storeDataToStorage(user.data.data);
          this.props.navigation.navigate("Landing");
        })
        .catch(error => {
          // console.log("user Does not Exist");
          this.setState({ userInfo: googleUser });
          this.setState({ modalVisible: true });
        });
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

  storeDataToStorage = async userData => {
    await storeUserData("info", JSON.stringify(userData));
    await storeUserData("auth", "1");
  };
  fbLoginResultHandler(userExists, fbUser) {
    this.setState({ AuthButtonsVisible: false }, () => {
      if (userExists === true) {
        this.props.navigation.navigate("Landing");
      } else if (userExists === false) {
        this.setState({ userInfo: fbUser });
        this.setState({ modalVisible: true });
      }
    });
  }
  render() {
    return (
      <View style={HomeStyles.container}>
        <View style={HomeStyles.innerContainer}>
          <View>
            <Image
              style={{ width: 250, height: 70 }}
              source={require("./../assets/subquch.png")}
            />
          </View>
          {this.state.AuthButtonsVisible ? (
            <View
              style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <FacebookAuthButton
                style={{ marginTop: 50 }}
                fbSignResult={(userExists, fbUser) =>
                  this.fbLoginResultHandler(userExists, fbUser)
                }
                fbAuthInit={() => {
                  console.log("hiding auth Buttons");
                  this.setState({ AuthButtonsVisible: false });
                }}
              />
              <GoogleSigninButton
                style={{ width: 237, height: 35, marginTop: 20, elevation: 0 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this.signIn}
              />
               <View style={{width: 250, height: 40, marginTop: 30}}>
                 <Button title="Continue With Google" buttonStyle={{backgroundColor: "#000"}} onPress={() => this.googleBtn.props.onPress()} />
               </View>
            </View>
          ) : (
            <View style={{ justifyContent: "center", marginTop: 75 }}>
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Welcome To SubQuch
              </Text>
              <ActivityIndicator
                size="large"
                color="#000"
                style={{ marginTop: 10 }}
              />
            </View>
          )}
          <View style={{ marginTop: 8 }}>
            <UserMoreInfoDialog
              modalVisible={this.state.modalVisible}
              userInfo={this.state.userInfo}
              moreInfoDone={userExists => {
                if (userExists) {
                  this.props.navigation.navigate("Landing");
                } else {
                  Alert.alert("Error in Adding User");
                }
              }}
              setModal={modal => {
                this.setState({ modalVisible: modal });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
