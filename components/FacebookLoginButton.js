import React, { Component } from 'react'
import { View } from 'react-native'
import { userRegistered } from '../services/userRegistered'
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  LoginManager,
  GraphRequestManager
} from "react-native-fbsdk";
export default class FacebookLoginButton extends Component {
  render() {
    return (
      <LoginButton
      readPermissions={["email"]}
      style={{ width: 230, height: 30 }}
      onLoginFinished={(error, result) => {
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
    )
  }
}
