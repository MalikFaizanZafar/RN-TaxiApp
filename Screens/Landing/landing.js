import React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid
} from "react-native";
import { createDrawerNavigator } from "react-navigation";
import MapScreen from "./map";
import MapScreenTwo from "./mapTwo";
import AppTopBar from "../../components/AppTopBar";
import AppSearchView from "../../components/AppSearchView";
import AppBrandsListView from "../../components/AppBrandsListView";
import { getFilterQueryData } from "../../services/getIntialData";
import { getNearestFranchises, LandingTabClickHandler, LandingSearchHandler } from "../../services/helperFunctions";
import LandingScreenStyles from './../../Styles/landing'
export default class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    latitude: null,
    longitude: null,
    error: null,
    dataArray: [],
    searchResult: [],
    ListViewData: [],
    brands: [],
    searchKey: "",
    brandsLoading: true,
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
            getFilterQueryData(this.state.latitude, this.state.longitude, 35).then(promiseResponse => {
              console.log("promiseResponse is : ", promiseResponse);
              this.setState({
                dataArray: promiseResponse.data.data,
                brandsLoading: false,
              });
              this.setState({
                ListViewData: getNearestFranchises(this.state.dataArray, 'franchise'),
                selectedTab: 0
              });
            }).catch(promiseError => {
              console.log("promiseError is : ", promiseError);
            })
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

  componentDidMount() {
    this.LocationSerivce();
  }

  onSearchHandler(searchKey) {
    this.setState({ brandsLoading: true });
    LandingSearchHandler(this.state.latitude, this.state.longitude, 35, searchKey, this.state.selectedTab).then(promiseResponse => {
      this.setState({
        ListViewData: promiseResponse
      }, () => {
        this.setState({ brandsLoading: false })
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
        <View>
          <ScrollView
            horizontal={true}
            style={{ height: 45 }}
            showsHorizontalScrollIndicator={false}
          >
            {this.state.tabItems.map((item, i) => {
              return (
                <TouchableOpacity onPress={this.tabClicked.bind(this, i)} key={i}
                activeOpacity={1.0}
                style={
                  this.state.selectedTab === i
                    ? LandingScreenStyles.buttonSelected
                    : LandingScreenStyles.button
                }>
                  <Text
                    style={
                      this.state.selectedTab === i
                        ? LandingScreenStyles.buttonSelectedText
                        : LandingScreenStyles.buttonText
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity> 
              );
            })}
          </ScrollView>
        </View>
        {this.state.brandsLoading ? (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{ marginTop: 150 }}
          />
        ) : this.state.dataArray.length === 0 ? (
          <Text style={{ marginLeft: 40, marginTop: 100 }}>
            No Franchises within the Range of 5 Kms
          </Text>
        ) : (
          <AppBrandsListView data={this.state.ListViewData} />
        )}
      </View>
    );
  }
}



export const MyDrawerNavigator = createDrawerNavigator(
  {
    Landing: {
      screen: LandingScreen
    },
    Map: {
      screen: MapScreen
    },
    MapTwo: {
      screen: MapScreenTwo
    }
  },
  {
    backgroundColor: "green",
    drawerWidth: 200,
    initialRouteName: "Landing"
  }
);
