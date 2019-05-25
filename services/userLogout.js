import { AsyncStorage } from 'react-native'
export const userLogout = () => {
  return AsyncStorage.setItem("@SubQuch-User-auth", "0").then(nothing => {
    return new Promise.resolve(nothing)
  }).catch(error => {
    return new Promise.reject(error)
  })
}