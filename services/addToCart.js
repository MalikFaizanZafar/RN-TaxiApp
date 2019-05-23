import { AsyncStorage } from "react-native";
import { storeUserData, removeUserData } from "./signUser";
import { BehaviorSubject } from "rxjs";

export const cartItemsCount = new BehaviorSubject();

export const addToCart = async itemDeal => {
  await AsyncStorage.getItem("@SubQuch-User-cart").then(data => {
    let cartArray = [];
    if (data == null) {
      cartArray.push(itemDeal);
      storeUserData("cart", JSON.stringify(cartArray));
      cartItemsCount.next(1);
    } else {
      cartArray = JSON.parse(data);
      cartArray.push(itemDeal);
      cartItemsCount.next(cartArray.length);
      removeUserData("cart");
      storeUserData("cart", JSON.stringify(cartArray));
    }
  });
};
