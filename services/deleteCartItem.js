import { AsyncStorage } from "react-native";
import { cartItemsCount } from "./addToCart";
import { storeUserData } from "./signUser";
export const deleteCartItem = async(id) => {
  await AsyncStorage.getItem("@SubQuch-User-cart").then(data => {
      cartArray = JSON.parse(data);
      filterdCart = cartArray.filter(item => item.id !== id)
      storeUserData("cart", JSON.stringify(filterdCart));
      cartItemsCount.next(filterdCart.length)
      return new Promise.resolve(filterdCart);
  });
}