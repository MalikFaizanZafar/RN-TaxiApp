import axios from "axios";
import {AsyncStorage} from 'react-native';
import { SERVER_URL } from "../constants";

const URL = SERVER_URL
export default signUser =  (userInfo) => {
  return new Promise((resolve, reject) => {
    if(userInfo.provider === "GOOGLE"){
      if(userInfo){
        axios.post(`${URL}/api/auth/signup/user`, userInfo).then(res => {
          storeUser(userInfo.socialId)
          resolve(res)
        }).catch(error => {
          console.log('error is ', error)
          reject(error)
        })
  
      }else {
        reject('We dont have the User info')
      }
    }
    else{
      if(userInfo){
        
        axios.post(`${URL}/api/auth/signup/user`, userInfo).then(res => {
          console.log('res from server is ', res)
          storeUser(userInfo.socialId)
          resolve(res)
        }).catch(error => {
          console.log('error is ', error)
          reject(error)
        })
      }
    }
  })
}

storeUser = async (socialId) => {
  try {
    await AsyncStorage.setItem('SubQuch_User', socialId);
  } catch (error) {
    // Error saving data
  }
};