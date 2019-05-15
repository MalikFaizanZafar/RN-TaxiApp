import { SERVER_URL } from "../constants";
import axios from "axios";

const URL = SERVER_URL;
export const getFranchiseData = (franchiseId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/api/auth/franchise/${franchiseId}`).then(franchiseResponse => {
      resolve(franchiseResponse)
    }).catch(franchiseError => {
      reject(franchiseError)
    })
  })
} 