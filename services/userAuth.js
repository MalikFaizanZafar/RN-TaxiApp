import { AsyncStorage } from 'react-native'
export const userAuthStatus = async () => {
  await AsyncStorage.getItem("@SubQuch-User-auth").then(data => {
    if(data === "1"){
      return new Promise.resolve(data)
    }else{
      return new Promise.reject(data)
    }
  }).catch(error => {
    return new Promise.reject(error)
  })
}