import axios from "axios";
import { AsyncStorage } from "react-native";
import { SERVER_URL } from "../constants";
import { removeUserData } from "./signUser";
import { cartItemsCount } from "./addToCart";
const URL = SERVER_URL;
export const sendOrder = async orderArray => {
  let extraFields = {
    userId: 0,
    orderNumber: null,
    location: null,
    latitude: 0,
    longitude: 0,
    orderTotal: 0,
    delivery: true,
    acknowledged: true
  };
  await AsyncStorage.getItem("@SubQuch-User-latitude").then(lat => {
    extraFields.latitude = lat;
  });
  await AsyncStorage.getItem("@SubQuch-User-longitude").then(lon => {
    extraFields.longitude = lon;
  });
  await AsyncStorage.getItem("@SubQuch-User-info").then(user => {
    let userInfo = JSON.parse(user);
    extraFields.userId = userInfo.userId;
  });
  let promisesArray = []
  orderArray.forEach(franchiseOrder => {
    let order = {
      ...extraFields,
      franchiseId: franchiseOrder.franchiseId,
      items: franchiseOrder.items,
      deals: franchiseOrder.deals
    };
    promisesArray.push(addFranchiseOrder(order))
  })
  return axios.all(promisesArray).then(allPromisesResponse => {
    removeUserData("cart")
    cartItemsCount.next(0)
    return new Promise.resolve(allPromisesResponse)
  }).catch(allPromisesError => {
    return new Promise.reject(allPromisesError)
  })
};

function addFranchiseOrder(order){
  return axios.post(`${URL}/api/order`, order)
}