import axios from 'axios'
import { SERVER_URL } from '../constants';
const URL = SERVER_URL
export const franchiseCheckin = (userId, franchiseId) => {
  console.log(`userId is : ${userId}  ; franchiseId is ${franchiseId}`)
  return axios.get(`${URL}/api/auth/franchise/checkin?userId=${userId}&franchiseId=${franchiseId}`).then(res => {
    console.log("franchiseCheckin res is : ", res)
    return new Promise.resolve(res)
  }).catch(err => {
    return new Promise.reject(err)
  })
}