import axios from "axios";
import { SERVER_URL } from "../constants";
const URL = SERVER_URL
export const getFilterQueryData = (latitude, longitude,distance) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/api/filter?lat=${latitude}&long=${longitude}&distance=${distance}`)
      .then(dataResponse => {
        resolve(dataResponse);
      })
      .catch(brandsError => {
        console.log("brandsError is : ", brandsError);
        reject(brandsError);
      });
  });
};
