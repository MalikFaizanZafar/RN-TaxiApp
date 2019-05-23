import { AsyncStorage } from "react-native";
export const getUser = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("@SubQuch-User-info").then(userInfo => {
      if (userInfo) {
        resolve(JSON.parse(userInfo));
      } else {
        reject({})
      }
    });
  })
};
