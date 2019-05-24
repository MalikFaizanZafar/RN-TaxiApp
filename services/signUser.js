import axios from "axios";
import {AsyncStorage} from 'react-native';
import { SERVER_URL } from "../constants";
import firebase from "react-native-firebase";

const URL = SERVER_URL
export default signUser =  (userInfo) => {
  return new Promise((resolve, reject) => {
    getNotificationToken().then(deviceToken => {
      userInfo.device = deviceToken
      if(userInfo.provider === "GOOGLE"){
        if(userInfo){
          console.log("userInfo(Google) is ", userInfo)
          axios.post(`${URL}/api/auth/signup/user`, userInfo).then(res => {
            storeUserData('info', JSON.stringify(res.data.data))
            resolve(res)
          }).catch(error => {
            reject(error)
          })
    
        }else {
          reject('We dont have the User info')
        }
      }
      else{
        if(userInfo){
          axios.post(`${URL}/api/auth/signup/user`, userInfo).then(res => {
            storeUserData('info', JSON.stringify(res.data.data))
            storeUser(userInfo.socialId)
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        }
      }
    }).catch(deviceTokenError => {
      console.log('deviceTokenError is ', deviceTokenError)
      reject(deviceTokenError)
    })
  })
}

storeUser = async (socialId) => {
  try {
    await AsyncStorage.setItem('@SubQuch-User', socialId);
  } catch (error) {
    // Error saving data
  }
};

export const storeUserData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@SubQuch-User-${key}`, value);
  } catch (error) {
    // Error saving data
  }
}

export const removeUserData = async (key, value) => {
  try {
    await AsyncStorage.removeItem(`@SubQuch-User-${key}`);
  } catch (error) {
    // Error saving data
  }
}

getNotificationToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {
    return new Promise.resolve(fcmToken)
  } else {
    return new Promise.reject(null)
  }
};