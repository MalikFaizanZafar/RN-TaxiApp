import React from "react";
import { StyleSheet, View, Button, Text, Modal, TouchableHighlight, Image } from "react-native";
import { connect } from 'react-redux';
import { GoogleSignin, GoogleSigninButton, statusCodes } from "react-native-google-signin";
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import { addUser } from "../store/actions";
import signUser from "../services/signUser";
import { Input, Avatar  } from 'react-native-elements';
import RadioGroup,{Radio} from "react-native-radio-input";

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
  }
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      modalVisible: false
    };
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  getChecked = (value) => {
    // value = our checked value
    console.log(value)
  }
  componentDidMount(){
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
      this.setState({ userInfo });
      let googleUser = {
        socialId: userInfo.user.id,
        password: '1234',
        token: userInfo.accessToken,
        name : userInfo.user.name,
        email: userInfo.user.email,
        photo: userInfo.user.photo,
        gender: 'male',
        birthday: '07-07-1995'
      }
      this.setState({userInfo : googleUser })
      this.setState({modalVisible: true});
      console.log('state is : ', this.state)
      // signUser(googleUser, "GOOGLE").then(resp => {
      //   console.log('resp 2 is ; ', resp)
      //   this.setState({modalVisible: true});
      //   // this.props.navigation.navigate("Landing")
      // }).catch(msg2 => {
      //   console.log('msg 2 is ; ', msg2)
      // })
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
              source={require("./../assets/subquch.png")}
            />
          </View>
          <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
            <LoginButton
              style={{ width: 230, height: 30 }}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    alert("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    alert("login is cancelled.");
                  } else {
          
                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        let accessToken = data.accessToken
          
                        const responseInfoCallback = (error, result) => {
                          if (error) {
                            console.log(error)
                            alert('Error fetching data: ' + error.toString());
                          } else {
                            console.log(result)
                            alert('Success fetching data: ' + result.toString());
                          }
                        }
          
                        const infoRequest = new GraphRequest(
                          '/me',
                          {
                            accessToken: accessToken,
                            parameters: {
                              fields: {
                                string: 'email,name,picture'
                              }
                            }
                          },
                          (err, rslt) => {
                            // console.log('graphRequest result is : ', rslt)
                            signUser({...rslt,accessToken }, "FACEBOOK").then(resp => {
                              console.log('resp result is : ', resp)
                              this.setState({modalVisible: true});
                              // this.props.navigation.navigate("Landing")
                            }).catch(msg2 => {
                              console.log('msg 2 is ; ', msg2)
                            })
                          }
                        );
          
                        // Start the graph request.
                        new GraphRequestManager().addRequest(infoRequest).start()
          
                      }
                    )
          
                  }
                }
              }
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
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text style={{justifyContent: "center", alignItems: "center"}}>Hello World!</Text>
              <View style={{justifyContent: "center", alignItems: "center"}}>
              <Avatar
                  rounded
                  size="xlarge"
                  title={this.state.userInfo.name}
                  source={{
                    uri: this.state.userInfo.photo,
                  }}
                />
                <Text>{this.state.userInfo.name}</Text>
                <Text>{this.state.userInfo.email}</Text>
              </View>
              <View style={{justifyContent: "center", alignItems: "center"}}>
              <Input
                placeholder={this.state.userInfo.email}
                accessibilityStates = {['disabled']}
              />
              </View>
              <View style={{justifyContent: "center", alignItems: "center"}}>
              <Input
                placeholder='Your Birthday'
                errorStyle={{ color: 'red' }}
                errorMessage='ENTER A VALID ERROR HERE'
              />
              </View>
              <View style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{justifyContent: "center", alignItems: "center"}}>Your Gender</Text>
              <RadioGroup getChecked={this.getChecked}>
                <Radio iconName={"lens"} label={"Male"} value={"male"}/>
                <Radio iconName={"lens"} label={"Female"} value={"female"}/>
            </RadioGroup>
              </View>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
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

export default HomeScreen