import { AsyncStorage } from 'react-native'
import {
  LoginManager
} from "react-native-fbsdk";
export const userLogout = () => {
  return AsyncStorage.setItem("@SubQuch-User-auth", "0").then(nothing => {
    LoginManager.logOut();
    return new Promise.resolve(nothing)
  }).catch(error => {
    return new Promise.reject(error)
  })
}