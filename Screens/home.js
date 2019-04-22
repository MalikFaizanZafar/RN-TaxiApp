import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Modal,
  TouchableHighlight,
  Image,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { addUser } from "../store/actions";
import signUser from "../services/signUser";
import { Avatar, Input } from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";

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
  state = {
    modalVisible: false
  };
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      phone: "",
      gender: "",
      birthday: "",
      modalVisible: false
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  getChecked = value => {
    // value = our checked value
    this.setState({
      gender: value
    });
    console.log(value);
  };
  componentDidMount() {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        "895935298518-8apvnm51q2vj6ivbm6pbqj7ma5v7dsq9.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
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
      this.setState({ userInfo: googleUser });
      this.setState({ modalVisible: true });
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
  isSaveDisabled(){
    if(this.state.phone === '' || this.state.birthday === '' || this.state.gender === ''){
      return true
    }
    else {
      return false
    }
  }
  async componentWillMount(){
    let subquch_user = await AsyncStorage.getItem('SubQuch_User')
    console.log('subquch_user : ', subquch_user)
    if(subquch_user){
      this.props.navigation.navigate("Landing");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View>
            <Image
              style={{ width: 250, height: 70 }}
              source={require("./../assets/subquch.png")}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <LoginButton
              style={{ width: 230, height: 30 }}
              onLoginFinished={(error, result) => {
                if (error) {
                  alert("login has error: " + result.error);
                } else if (result.isCancelled) {
                  alert("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    let accessToken = data.accessToken;

                    const responseInfoCallback = (error, result) => {
                      if (error) {
                        console.log(error);
                        alert("Error fetching data: " + error.toString());
                      } else {
                        console.log(result);
                        alert("Success fetching data: " + result.toString());
                      }
                    };

                    const infoRequest = new GraphRequest(
                      "/me",
                      {
                        accessToken: accessToken,
                        parameters: {
                          fields: {
                            string: "email,name,picture"
                          }
                        }
                      },
                      (err, rslt) => {
                        // console.log('graphRequest result is : ', rslt)
                        let facebookUser = {
                          socialId: rslt.id,
                          password: "1234",
                          token: accessToken,
                          name: rslt.name,
                          email: rslt.email,
                          photo: rslt.picture.data.url,
                          verified: false,
                          provider: "FACEBOOK"
                        };
                        this.setState({ userInfo: facebookUser });
                        this.setState({ modalVisible: true });
                      }
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();
                  });
                }
              }}
              onLogoutFinished={() => alert("logout.")}
            />
            <GoogleSigninButton
              style={{ width: 237, height: 35, marginTop: 10, elevation: 0 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this.signIn}
            />
          </View>
          <View style={{ marginTop: 8 }}>
            <Modal
              style={{ justifyContent: "center", alignItems: "center" }}
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={{ marginTop: 150 }}>
                <View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Avatar
                      rounded
                      size="large"
                      title={this.state.userInfo.name}
                      source={{
                        uri: this.state.userInfo.photo
                      }}
                    />
                    <Text style={{ marginTop: 10 }}>
                      {this.state.userInfo.name}
                    </Text>
                    <Text style={{ marginTop: 5 }}>
                      {this.state.userInfo.email}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 40,
                      marginLeft: 20,
                      width: 320
                    }}
                  >
                    <Input
                      placeholder="Your Phone Number"
                      keyboardType="numeric"
                      onChangeText={value => {
                        this.setState({ phone: value });
                      }}
                    />
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <DatePicker
                      style={{ width: 300, marginTop: 20 }}
                      date={this.state.birthday}
                      mode="date"
                      placeholder="Your Date of Birth"
                      format="DD-MM-YYYY"
                      minDate="01-01-1950"
                      maxDate="01-01-2030"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          marginLeft: 0
                        }
                      }}
                      onDateChange={date => {
                        this.setState({ birthday: date });
                      }}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      marginTop: 20,
                      flexDirection: "row",
                      marginLeft: 30
                    }}
                  >
                    <Text style={{ width : '30%'}}>Your Gender</Text>
                    <RadioForm
                      style={{ width : '70%'}}
                      radio_props={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" }
                      ]}
                      formHorizontal={true}
                      labelStyle={{ padding : 5}}
                      initial={"Male"}
                      onPress={value => {
                        this.setState({ gender: value });
                      }}
                    />
                  </View>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <View
                      style={{
                        marginTop: 40,
                        marginLeft: 20,
                        width: 320
                      }}
                    >
                      <Button
                        title="Save"
                        disabled={this.isSaveDisabled()}
                        onPress={() => {
                          let stateData = this.state;
                          let user = {
                            ...stateData.userInfo,
                            phone: stateData.phone,
                            gender: stateData.gender,
                            birthday: stateData.birthday
                          };
                          // console.log("user is ; ", user);
                          signUser(user)
                            .then(resp => {
                              console.log("Server Resonse is : ", resp);
                              this.setState({ modalVisible: false });
                              this.props.navigation.navigate("Landing");
                            })
                            .catch(msg2 => {
                              console.log("msg 2 is ; ", msg2);
                            });
                        }}
                      />
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
