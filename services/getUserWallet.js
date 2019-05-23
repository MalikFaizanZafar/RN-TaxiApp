import { SERVER_URL } from "../constants";
import axios from 'axios'

const URL = SERVER_URL
export const getUserWallet = (userId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/api/auth/wallet?userId=${userId}`).then(walletResponse => {
      resolve(walletResponse)
    }).catch(walletError => reject(walletError))
  })
}