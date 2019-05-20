import { AsyncStorage } from 'react-native'
export const userAuthStatus = async () => {
  await AsyncStorage.getItem("@SubQuch-User-auth").then(data => {
    if(data === "1"){
      console.log("data(True) exists : ", data)
      return true;
    }else{
      console.log("data(False) exists : ", data)
      return false;
    }
  })
}