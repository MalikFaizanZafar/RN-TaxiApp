import React from "react";
import { View, PermissionsAndroid, Alert } from "react-native";
import AppTopBar from "../../components/AppTopBar";
import AppSearchView from "../../components/AppSearchView";
import LandingTabBar from "../../components/LandingTabBar";
import AppBrandsListView from "../../components/AppBrandsListView";
import { getFilterQueryData, getUserLocation } from "../../services/getIntialData";
import { getNearestFranchises, LandingTabClickHandler, LandingSearchHandler } from "../../services/helperFunctions";
import LandingScreenStyles from './../../Styles/landing'
import firebase from 'react-native-firebase'
export default class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null
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
    selectedTab: 0
  }

  async LocationSerivce() {
    try {
      const granted = await PermissionsAndroid.request(
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
            this.populateInitialData(position.coords.latitude, position.coords.longitude, 35)
          },
          error => this.setState({ error: error.message }),
          { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
        );
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  populateInitialData(latitude, longitude, distance){

    getFilterQueryData(latitude, longitude, distance).then(promiseResponse => {
      console.log("promiseResponse is : ", promiseResponse);
      this.setState({
        dataArray: promiseResponse.data.data,
        dataLoading: false,
      });
      this.setState({
        ListViewData: getNearestFranchises(this.state.dataArray, 'franchise'),
        selectedTab: 0
      });
    }).catch(promiseError => {
      Alert.alert(
        'Network Problem',
        'No Internet Connection. Make Sure Your Wifi is Turned On',
        [
          {text: 'OK', onPress: () => this.populateInitialData(this.state.latitude, this.state.longitude, distance)},
        ],
        {cancelable: false},
      );
    })

  }
  getNotificationToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          console.log("fcmToken is : ", fcmToken)
          firebase.initializeApp({
            apiKey: "AIzaSyBVuIpEpE4Ke9xam26eRzVZItTslj6iTMY",
            authDomain: "subquch-d4369.firebaseapp.com",
            databaseURL: "https://subquch-d4369.firebaseio.com",
            projectId: "subquch-d4369",
            storageBucket: "gs://subquch-d4369.appspot.com",
            messagingSenderId: "54989238851"
          })
          const DB = firebase.database().ref('fcmTokens/')
          const data = { [(Math.random()*100000).toFixed(0)]: fcmToken }
           DB.set(data).then(saveResponse => {
             console.log("saveResponse is : ", saveResponse)
           })
      } else {
          // user doesn't have a device token yet
      }
  }
  // componentDidMount() {
  //   this.LocationSerivce();
  //   this.getNotificationToken()
  //   // getUserLocation().then(getUserLocationResponse => {
  //   //   this.setState({ dataArray: getUserLocationResponse.data, ListViewData: getNearestFranchises(this.state.dataArray, 'franchise')}, () => {
  //   //     this.setState({
  //   //       latitude: getUserLocationResponse.latitude,
  //   //       longitude: getUserLocationResponse.longitude,
  //   //       dataLoading: false
  //   //     })
  //   //   })
  //   // })
  // }

  async componentDidMount() {
    this.checkPermission();
    this.LocationSerivce();
    this.getNotificationToken();
    this.createNotificationListeners();
  }
  
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
  
  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
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
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
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
        console.log('permission rejected');
    }
  }
  onSearchHandler(searchKey) {
    this.setState({ dataLoading: true });
    LandingSearchHandler(this.state.latitude, this.state.longitude, 35, searchKey, this.state.selectedTab).then(promiseResponse => {
      this.setState({
        ListViewData: promiseResponse
      }, () => {
        this.setState({ dataLoading: false })
      })
    })
  }

  updateSearch = search => {
    this.setState({ search });
  };

  tabClicked(id) {
    this.setState({
      selectedTab: id
    }, () => {
        this.setState({
          ListViewData: LandingTabClickHandler(this.state.dataArray, this.state.selectedTab)
        })
    });
  }
  
  franchiseOnPressHandler(id){
    if(this.state.selectedTab === 0){
        this.props.navigation.navigate('Franchise', { franchiseId : id, userLat: this.state.latitude, userLon: this.state.longitude})
    }else {
    }
  }

  render() {
    return (
      <View style={LandingScreenStyles.container}>
        <AppTopBar
          openSubquchDrawer={() => this.props.navigation.openDrawer()}
        />
        <AppSearchView
          updateSearch={val => {
            this.onSearchHandler(val);
          }}
          searchType={this.state.selectedTab === 0? 'brands': 'deals'}
        />
        <AppBrandsListView data={this.state.ListViewData} dataLoading={this.state.dataLoading} franchiseOnPress={(id) => this.franchiseOnPressHandler(id)}/>
        <LandingTabBar tabItems={this.state.tabItems} tabClicked={(id) => this.tabClicked(id)} selectedTab={this.state.selectedTab} />
      </View>
    );
  }
}

