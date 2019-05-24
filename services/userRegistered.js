import { SERVER_URL } from "../constants";
import axios from 'axios'
import { AsyncStorage } from 'react-native'
const URL = SERVER_URL
export const userRegistered = (email) => {
  return axios.get(`${URL}/api/auth/user?email=${email}`).then(res => {
    console.log("User Exist ", res)
    return AsyncStorage.setItem("@SubQuch-User-auth", "1").then(sghl => {
      return new Promise.resolve(res)
    })
  }).catch(err => {
    console.log("User Does Not Exist", err)
    return new Promise.reject(err)
  })
}