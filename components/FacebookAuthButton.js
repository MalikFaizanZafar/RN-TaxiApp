import React, { Component } from "react";
import { View } from "react-native";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  LoginManager,
  GraphRequestManager
} from "react-native-fbsdk";
import { userRegistered } from "../services/userRegistered";
import { storeUserData } from "../services/signUser";
import { Button } from "react-native-elements";
import getUser from "../services/getUser";
export default class FacebookAuthButton extends Component {
  storeDataToStorage = async userData => {
    await storeUserData("info", JSON.stringify(userData));
    await storeUserData("auth", "1");
  };
  // getToken(){
  //   let token = ''
  //   getUser().then(user => {
  //     token= user.token
  //   })
  //   return token;
  // }
  handleFbLogin = () => {
    this.props.fbAuthInit();
    LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
      result => {
        console.log("result is : ", result);
        AccessToken.getCurrentAccessToken().then(data => {
          console.log("data is : ", data);
          if (data === null) {
            console.log("data is null");
            // this.btnRef.props.onPress()
          }
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
              console.log("fb rslt is : ", rslt);
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
                  // this.props.navigation.navigate("Landing");
                  this.props.fbSignResult(true, user.data.data);
                })
                .catch(err => {
                  // this.setState({ userInfo: facebookUser });
                  // this.setState({ modalVisible: true });
                  this.props.fbSignResult(false, facebookUser);
                });
            }
          );
          // Start the graph request.
          new GraphRequestManager().addRequest(infoRequest).start();
        });
        if (result.isCancelled) {
          alert("Login cancelled");
        } else {
          // alert('Login success with permissions: ' + JSON.stringify(result));
        }
      },
      error => {
        alert("Login fail with error: " + error);
      }
    );
  };
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["email"]}
          style={{ width: 230, height: 30, display: "none" }}
          onLoginFinished={(error, result) => {
            this.props.fbAuthInit();
            if (error) {
              alert("login has error: " + result.error);
            } else if (result.isCancelled) {
              alert("login is cancelled.");
            } else {
              LoginManager.logInWithReadPermissions([
                "public_profile",
                "email"
              ]).then(
                result => {
                  if (result.isCancelled) {
                    alert("Login cancelled");
                  } else {
                    // alert('Login success with permissions: ' + JSON.stringify(result));
                  }
                },
                error => {
                  alert("Login fail with error: " + error);
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
                    console.log("fb rslt is : ", rslt);
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
                        // this.props.navigation.navigate("Landing");
                        this.props.fbSignResult(true, user.data.data);
                      })
                      .catch(err => {
                        // this.setState({ userInfo: facebookUser });
                        // this.setState({ modalVisible: true });
                        this.props.fbSignResult(false, facebookUser);
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
        <View style={{ width: 250, height: 40 }}>
          <Button
            ref={component => (this.btnRef = component)}
            title="Continue With Facebook"
            buttonStyle={{ backgroundColor: "#000" }}
            onPress={this.handleFbLogin}
          />
        </View>
      </View>
    );
  }
}
