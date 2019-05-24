import { AsyncStorage } from 'react-native'
export const userLogout = async () => {
  await AsyncStorage.setItem("@SubQuch-User-auth", "0").then(nothing => {
    new Promise.resolve(nothing)
  }).catch(error => {
    new Promise.reject(error)
  })
}