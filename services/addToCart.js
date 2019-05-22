import { AsyncStorage } from "react-native";
import { storeUserData, removeUserData } from "./signUser";
import { BehaviorSubject } from 'rxjs';

export const cartItemsCount = new BehaviorSubject();

export const addToCart = async itemDeal => {
  // await removeUserData("cart")
  await AsyncStorage.getItem("@SubQuch-User-cart").then(data => {
    if (data == null) {
      storeUserData("cart", JSON.stringify(itemDeal));
      cartItemsCount.next(1)
    } else {
      let cartArray = [];
      let tempData = JSON.parse(data);
      if(Object.getPrototypeOf( tempData ) === Object.prototype){
        cartArray.push(tempData)
        cartArray.push(itemDeal)
        cartItemsCount.next(cartArray.length)
        removeUserData("cart")
        storeUserData("cart", JSON.stringify(cartArray));
      } else {
        cartArray = tempData
        cartArray.push(itemDeal)
        cartItemsCount.next(cartArray.length)
        removeUserData("cart")
        storeUserData("cart", JSON.stringify(cartArray));
      }
    }
  });
};
