import axios  from 'axios'
import { SERVER_URL } from '../constants';
import { getUser } from './getUser';
const URL =  SERVER_URL
export const setDeviceToken = (token) => {
  return new Promise((resolve, reject) => {
    let setDevicePostDto = {
      userId: 0,
      device: token
    }
    getUser().then(userInfo => {
      setDevicePostDto.userId = userInfo.userId
      axios.post(`${URL}/api/auth/login/reset-device`, setDevicePostDto).then(setDeviceResponse => {
        return resolve(setDeviceResponse)
      }).catch(setDeviceError => {
        reject(setDeviceError)
      })
    }).catch(userInfoError => {
      console.log("userInfoError is : ", userInfoError)
    })
  })
}