import React from "react";
import { PermissionsAndroid } from "react-native";
import axios from "axios";
import { SERVER_URL } from "../constants";
const URL = SERVER_URL
export const getFilterQueryData = (latitude, longitude,distance) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/api/filter?lat=${latitude}&long=${longitude}&distance=${distance}`)
      .then(dataResponse => {
        resolve(dataResponse);
      })
      .catch(brandsError => {
        // console.log("brandsError is : ", brandsError)
        reject(brandsError);
      });
  });
};

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message:
          "SubQuch needs access to your location " +
          "so we can know where you are."
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use locations ");
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position);
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          });
          getFilterQueryData(position.coords.latitude, position.coords.longitude, 35).then(promiseResponse => {
            console.log("promiseResponse is : ", promiseResponse);
            let getUserLocationResponse = {
              latitude : position.coords.latitude,
              longitude: position.coords.longitude,
              data: promiseResponse.data.data
            }
            resolve(getUserLocationResponse)
            // this.setState({
            //   dataArray: promiseResponse.data.data,
            //   dataLoading: false,
            // });
            // this.setState({
            //   ListViewData: getNearestFranchises(this.state.dataArray, 'franchise'),
            //   selectedTab: 0
            // });
          }).catch(promiseError => {
            console.log("promiseError is : ", promiseError);
          })
        },
        error => reject(error),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
      );
    } else {
      console.log("Location permission denied");
    }
  })
}