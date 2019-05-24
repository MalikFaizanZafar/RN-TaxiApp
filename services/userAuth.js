import { AsyncStorage } from 'react-native'
export const userAuthStatus = async () => {
  await AsyncStorage.getItem("@SubQuch-User-auth").then(data => {
    if(data === "1"){
      console.log("data(True) exists : ", data)
      return new Promise.resolve(data)
    }else{
      console.log("data(False) exists : ", data)
      return new Promise.reject(data)
    }
  }).catch(error => {
    return new Promise.reject(error)
  })
}