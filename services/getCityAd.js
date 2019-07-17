import { SERVER_URL } from "../constants";
import axios from "axios";

const URL = SERVER_URL;
export const getCityAd = (city) => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/api/auth/admin/advertisement?city=${city}`).then(cityAdResponse => {
      resolve(cityAdResponse)
    }).catch(franchiseError => {
      reject(franchiseError)
    })
  })
} 