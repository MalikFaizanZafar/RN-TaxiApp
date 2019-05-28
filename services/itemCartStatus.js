import { AsyncStorage } from "react-native";
export const itemCartStatus = async(id)=> {
  return await AsyncStorage.getItem("@SubQuch-User-cart").then(data => {
    cartArray = JSON.parse(data);
    if(cartArray === null){
      return new Promise.resolve(false);
    }else{
      itemArray = cartArray.filter(item => item.id === id)
      if(itemArray.length === 0){
        return new Promise.resolve(false);
      }else{
        return new Promise.resolve(true);
      }
    }
});
}