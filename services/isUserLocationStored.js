import { AsyncStorage } from 'react-native'
export  const isUserLocationStored = () => {
  return AsyncStorage.getItem("@SubQuch-User-latitude").then(lat => {
    return AsyncStorage.getItem("@SubQuch-User-longitude").then(lon => {
      if(lon){
        return new Promise.resolve({latitude: lat, longitude: lon})
      }else {
        return new Promise.reject(false)
      }
    })
  })
}