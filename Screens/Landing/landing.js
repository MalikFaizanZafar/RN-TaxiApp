import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  PermissionsAndroid
} from "react-native";
import AppTopBar from "../../components/AppTopBar";
import AppSearchView from "../../components/AppSearchView";
import LandingTabBar from "../../components/LandingTabBar";
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
            getFilterQueryData(this.state.latitude, this.state.longitude, 35).then(promiseResponse => {
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
        <LandingTabBar tabItems={this.state.tabItems} tabClicked={(id) => this.tabClicked(id)} selectedTab={this.state.selectedTab} />
        {this.state.dataLoading ? (
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

