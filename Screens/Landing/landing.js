import React from "react";
import { View, PermissionsAndroid, Alert, AsyncStorage } from "react-native";
import AppTopBar from "../../components/AppTopBar";
import AppSearchView from "../../components/AppSearchView";
import LandingTabBar from "../../components/LandingTabBar";
import AppBrandsListView from "../../components/AppBrandsListView";
import {
  getFilterQueryData,
  getUserLocation
} from "../../services/getIntialData";
import {
  getNearestFranchises,
  LandingTabClickHandler,
  LandingSearchHandler
} from "../../services/helperFunctions";
import LandingScreenStyles from "./../../Styles/landing";
import firebase from "react-native-firebase";
import { storeUserData } from "../../services/signUser";
import { isUserLocationStored } from "../../services/isUserLocationStored";
export default class LandingScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

  state = {
    latitude: null,
    longitude: null,
    error: null,
    dataArray: [],
    ListViewData: [],
    searchKey: "",
    dataLoading: true,
    tabItems: ["Brands", "Deals"],
    selectedTab: 0,
    cartItems: 0
  };

  async LocationSerivce() {
    isUserLocationStored().then(location => {
      console.log("location Present : ", location)
      this.populateInitialData(
        parseFloat(location.latitude),
        parseFloat(location.longitude),
        35
      );
    }).catch( async (noLocation) => {
        console.log("noLocation Present : ", noLocation)
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission",
              message:
                "SubQuch needs access to your location"
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
                this.storeLatLonToStorage(
                  this.state.latitude,
                  this.state.longitude
                );
                this.populateInitialData(
                  position.coords.latitude,
                  position.coords.longitude,
                  35
                );
              },
              error => this.setState({ error: error.message }),
              { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
            );
          } else {
            console.log("Location permission denied");
            Alert.alert(
              'SubQuch Alert ',
              'SubQuch Needs to Acess Your Location. Please Turn on Your GPS',
              [
                {text: 'OK', onPress: () => this.LocationSerivce()},
              ],
              {cancelable: false},
            );
          }
        } catch (err) {
          console.warn(err);
        }
    })
  }
  populateInitialData(latitude, longitude, distance) {
    getFilterQueryData(latitude, longitude, distance)
      .then(promiseResponse => {
        console.log("promiseResponse is : ", promiseResponse);
        this.setState({
          dataArray: promiseResponse.data.data,
          dataLoading: false
        });
        this.setState({
          ListViewData: getNearestFranchises(this.state.dataArray, "franchise"),
          selectedTab: 0
        });
      })
      .catch(promiseError => {
        Alert.alert(
          "Network Problem",
          "No Internet Connection. Make Sure Your Wifi is Turned On",
          [
            {
              text: "OK",
              onPress: () =>
                this.populateInitialData(
                  this.state.latitude,
                  this.state.longitude,
                  distance
                )
            }
          ],
          { cancelable: false }
        );
      });
  }
  getNotificationToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log("fcmToken is : ", fcmToken);
      // firebase.initializeApp(fbConfig);
    } else {
      // user doesn't have a device token yet
    }
  };
  storeLatLonToStorage = async (latitude, longitude) => {
    await storeUserData("latitude", latitude.toString());
    await storeUserData("longitude", longitude.toString());
  };
  async componentDidMount() {
    this.checkPermission();
    this.LocationSerivce();
    this.getNotificationToken();
    this.createNotificationListeners();
    try {
      // AsyncStorage.clear()
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      console.log("AsyncStorage Item has : ", items);
    } catch (error) {
      console.log("AsyncStorage error has : ", error);
    }
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }
  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem("@SubQuch-User-fcmToken", fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }
  onSearchHandler(searchKey) {
    this.setState({ dataLoading: true });
    LandingSearchHandler(
      this.state.latitude,
      this.state.longitude,
      35,
      searchKey,
      this.state.selectedTab
    ).then(promiseResponse => {
      this.setState(
        {
          ListViewData: promiseResponse
        },
        () => {
          this.setState({ dataLoading: false });
        }
      );
    });
  }

  updateSearch = search => {
    this.setState({ search });
  };

  tabClicked(id) {
    this.setState(
      {
        selectedTab: id
      },
      () => {
        this.setState({
          ListViewData: LandingTabClickHandler(
            this.state.dataArray,
            this.state.selectedTab
          )
        });
      }
    );
  }

  franchiseOnPressHandler(id) {
    if (this.state.selectedTab === 0) {
      this.props.navigation.navigate("Franchise", {
        franchiseId: id,
        userLat: this.state.latitude,
        userLon: this.state.longitude
      });
    } else {
    }
  }
  cartPressHandler() {
    this.props.navigation.navigate("Cart");
  }
  render() {
    return (
      <View style={LandingScreenStyles.container}>
        <AppTopBar
          openSubquchDrawer={() => this.props.navigation.openDrawer()}
          onCartPress={() => this.cartPressHandler()}
        />
        <AppSearchView
          updateSearch={val => {
            this.onSearchHandler(val);
          }}
          searchType={this.state.selectedTab === 0 ? "brands" : "deals"}
        />
        <AppBrandsListView
          data={this.state.ListViewData}
          dataLoading={this.state.dataLoading}
          franchiseOnPress={id => this.franchiseOnPressHandler(id)}
        />
        <LandingTabBar
          tabItems={this.state.tabItems}
          tabClicked={id => this.tabClicked(id)}
          selectedTab={this.state.selectedTab}
        />
      </View>
    );
  }
}
