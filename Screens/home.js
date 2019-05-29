import React from "react";
import {
  ActivityIndicator,
  View,
  Button,
  Text,
  Modal,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  LoginManager,
  GraphRequestManager
} from "react-native-fbsdk";
import { addUser } from "../store/actions";
import signUser, { storeUserData } from "../services/signUser";
import { Avatar, Input } from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";
import { googleConfig } from "../configs/googleConfig";
import HomeStyles from "../Styles/home";
import { userAuthStatus } from "../services/userAuth";
import { userRegistered } from "../services/userRegistered";

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
      screenVisible: false
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
    GoogleSignin.configure(googleConfig);
    userAuthStatus()
      .then(userAtuh => {
        this.props.navigation.navigate("Landing");
      })
      .catch(authFalse => {
        this.setState({
          screenVisible: true
        });
      });
  }
  signIn = async () => {
    this.setState({screenVisible : false})
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
          console.log("Google user is  : ", user);
          this.storeDataToStorage(user.data.data);
          this.props.navigation.navigate("Landing");
        })
        .catch(error => {
          console.log("user Does not Exist");
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
  isSaveDisabled() {
    if (
      this.state.phone === "" ||
      this.state.birthday === "" ||
      this.state.gender === ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  storeDataToStorage = async userData => {
    await storeUserData("info", JSON.stringify(userData));
    await storeUserData("auth", "1");
  };

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
          {this.state.screenVisible ? (
            <View
              style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <LoginButton
                readPermissions={["email"]}
                style={{ width: 230, height: 30 }}
                onLoginFinished={(error, result) => {
                  this.setState({screenVisible : false})
                  if (error) {
                    alert("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    alert("login is cancelled.");
                  } else {
                    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
                      (result) => {
                        if (result.isCancelled) {
                          alert('Login cancelled');
                        } else {
                          // alert('Login success with permissions: ' + JSON.stringify(result));
                        }
                      },
                      (error) => {
                        alert('Login fail with error: ' + error);
                      }
                    );
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
                          console.log("fb rslt is : ", rslt)
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
                          userRegistered(facebookUser.email)
                            .then(user => {
                              console.log("Facebook user is : ", user);
                              this.storeDataToStorage(user.data.data);
                              this.props.navigation.navigate("Landing");
                            })
                            .catch(err => {
                              this.setState({ userInfo: facebookUser });
                              this.setState({ modalVisible: true });
                            });
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
          ) : (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{ marginTop: 50 }}
            />
          )}
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
                    <Text style={{ width: "30%" }}>Your Gender</Text>
                    <RadioForm
                      style={{ width: "70%" }}
                      radio_props={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" }
                      ]}
                      formHorizontal={true}
                      labelStyle={{ padding: 5 }}
                      initial={"Male"}
                      onPress={value => {
                        this.setState({ gender: value });
                      }}
                    />
                  </View>
                  {this.state.signupLoading ? (
                    <ActivityIndicator
                      size="large"
                      color="#000"
                      style={{ marginTop: 80 }}
                    />
                  ) : (
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
                            this.setState({ signupLoading: true });
                            let stateData = this.state;
                            let user = {
                              ...stateData.userInfo,
                              phone: stateData.phone,
                              gender: stateData.gender,
                              birthday: stateData.birthday
                            };
                            // console.log("user is ; ", user);
                            signUser(user)
                              .then(res => {
                                console.log("Server Resonse is : ", res);
                                this.storeDataToStorage(res.data.data);
                                this.props.navigation.navigate("Landing");
                                // this.setState({ signupLoading: true })
                                // this.setState({ modalVisible: false});
                              })
                              .catch(msg2 => {
                                console.log("msg 2 is ; ", msg2);
                              });
                          }}
                        />
                      </View>
                    </TouchableHighlight>
                  )}
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
