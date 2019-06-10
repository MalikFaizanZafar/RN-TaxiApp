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
import { setDeviceToken } from "../../services/setDeviceToken";
import { Button } from "react-native-elements";
import OrderReviewDialog from "../../components/OrderReviewDialog";
export default class LandingScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null
  };

  state = {
    latitude: null,
    longitude: null,
    error: null,
    dataArray: [],
    ListViewData: [],
    searchKey: "",
    dataLoading: true,
    tabItems: ["Deals", "Brands"],
    selectedTab: 0,
    cartItems: 0,
    reviewDialog: false,
    currentOrderId: 0
  };

  async LocationSerivce() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "SubQuch needs access to your location"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use locations ");
        // console.log("navigator has :  ", navigator.geolocation);
        // this.setState({
        //   latitude: 33.6763934,
        //   longitude: 72.9980016,
        //   error: null
        // });
        // this.storeLatLonToStorage(this.state.latitude, this.state.longitude);
        // this.populateInitialData(
        //   33.6763934,
        //   72.9980016,
        //   35
        // );
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log("position is : ",position);
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
          error => {
            Alert.alert(
              "SubQuch Alert ",
              `SubQuch Needs to Acess Your Location. Please Turn ON Your GPS and Set Location Method to "High Accuracy" `,
              [{ text: "OK", onPress: () => this.LocationSerivce() }],
              { cancelable: false }
            );
            this.setState({ error: error.message })
          },
          { enableHighAccuracy: false, timeout: 200000 }
        );
      } else {
        console.log("Location permission denied");
        Alert.alert(
          "SubQuch Alert ",
          "SubQuch Needs to Acess Your Location. Please Turn on Your GPS",
          [{ text: "OK", onPress: () => this.LocationSerivce() }],
          { cancelable: false }
        );
      }
    } catch (err) {
      console.warn(err);
    }
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
          ListViewData: getNearestFranchises(this.state.dataArray, "deal"),
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
      setDeviceToken(fcmToken)
        .then(setTokenResponse => {
          console.log("device token is set", setTokenResponse);
        })
        .catch(setDeviceError => {
          console.log("device token is not set", setDeviceError);
        });
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
        new firebase.notifications.Notification()
          .setNotificationId(notification.data.notificacionId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .setData(notification.data);
        console.log("notification has : ", notification);
        if (!isNaN(notification.body)) {
          this.setState({ currentOrderId: Number(notification.body) }, () => {
            this.showReviewAlert();
          });
        } else {
          const { title, body } = notification;
          this.showAlert(title, body);
        }
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        console.log("onNotificationOpened", notificationOpen);
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
      console.log("!notificationOpen(Background)", notificationOpen);
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

  showReviewAlert() {
    Alert.alert(
      "SubQuch Order Review",
      "Your Order has been Completed. We would Like You to Write a Review for the Service ",
      [{ text: "OK", onPress: () => this.setState({ reviewDialog: true }) }],
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
    if (!searchKey) {
      console.log("searchKey is empty", this.state.dataArray);
      console.log(
        " getNearestFranchises(this.state.dataArray, deal): ",
        getNearestFranchises(this.state.dataArray, "deal")
      );
      console.log(
        " getNearestFranchises(this.state.dataArray, franchise): ",
        getNearestFranchises(this.state.dataArray, "franchise")
      );
      this.setState({
        ListViewData:
          this.state.selectedTab === 0
            ? getNearestFranchises(this.state.dataArray, "deal")
            : getNearestFranchises(this.state.dataArray, "franchise")
      });
      this.setState({ dataLoading: false });
    } else {
      console.log("searchKey is NOT empty");
      LandingSearchHandler(
        this.state.latitude,
        this.state.longitude,
        35,
        searchKey,
        this.state.selectedTab
      ).then(promiseResponse => {
        console.log("searchPromise response is : ", promiseResponse);
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
    if (this.state.selectedTab === 1) {
      this.props.navigation.navigate("Franchise", {
        franchiseId: id,
        userLat: this.state.latitude,
        userLon: this.state.longitude
      });
    } else {
    }
  }
  cartPressHandler(cartItemsCount) {
    if (cartItemsCount > 0) {
      this.props.navigation.navigate("Cart");
    } else {
      Alert.alert(
        "SubQuch Alert",
        "No Item or Deals in the Cart. Please Add Some Items or Deals",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }
  render() {
    return (
      <View style={LandingScreenStyles.container}>
        <AppTopBar
          openSubquchDrawer={() => this.props.navigation.openDrawer()}
          onCartPress={cartItemsCount => this.cartPressHandler(cartItemsCount)}
        />
        <AppSearchView
          updateSearch={val => {
            this.onSearchHandler(val);
          }}
          searchType={this.state.selectedTab === 0 ? "deals" : "brands"}
        />
        <AppBrandsListView
          data={this.state.ListViewData}
          dataLoading={this.state.dataLoading}
          selectedTab={this.state.selectedTab}
          franchiseOnPress={id => this.franchiseOnPressHandler(id)}
        />
        <LandingTabBar
          tabItems={this.state.tabItems}
          tabClicked={id => this.tabClicked(id)}
          selectedTab={this.state.selectedTab}
        />
        <OrderReviewDialog
          reviewDialogVisible={this.state.reviewDialog}
          orderId={this.state.currentOrderId}
          closeReviewDialog={() => {
            this.setState({ reviewDialog: false });
          }}
        />
      </View>
    );
  }
}
