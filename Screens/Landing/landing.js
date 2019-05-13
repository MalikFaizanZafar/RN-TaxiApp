import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  PermissionsAndroid
} from "react-native";
import { createDrawerNavigator } from "react-navigation";
import MapScreen from "./map";
import MapScreenTwo from "./mapTwo";
import AppTopBar from "../../components/AppTopBar";
import AppSearchView from "../../components/AppSearchView";
import AppItemsView from "../../components/AppItemsView";
import AppBrandsListView from "../../components/AppBrandsListView";
import axios from "axios";
import { SERVER_URL } from "../../constants";
const URL = SERVER_URL;
export default class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    latitude: null,
    longitude: null,
    error: null,
    brands: [],
    searchKey: "",
    brandsLoading: true
  };
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
    this.LocationSerivce().then(location => {
      axios
      .get(`${URL}/api/auth/filter?lat=${this.state.latitude}&long=${this.state.longitude}&distance=35`)
      .then(brandsResponse => {
        console.log('brandsResponse is : ', brandsResponse)
        this.setState({
          brands: brandsResponse.data.data.filter(data => data.type === 'franchise'),
          brandsLoading: false
        });
        console.log('state is : ', this.state)
      })
      .catch(brandsError => {
        console.log("brandsError is : ", brandsError);
      });
    })
  }

  onSearchHandler(searchKey) {
    this.setState({ brandsLoading: true });
    axios
      .get(
        `${URL}/api/auth/filter?lat=${this.state.latitude}&long=${this.state.longitude}&distance=35&filter=${searchKey}`
      )
      .then(brandsResponse => {
        console.log('search brandsResponse is : ', brandsResponse)
        this.setState({
          brands: brandsResponse.data.data.filter(data => data.type === 'franchise'),
          brandsLoading: false
        });
      })
      .catch(brandsError => {
        console.log("brandsError is : ", brandsError);
      });
  }
  updateSearch = search => {
    this.setState({ search });
  };
  render() {
    return (
      <View style={styles.container}>
        <AppTopBar
          openSubquchDrawer={() => this.props.navigation.openDrawer()}
        />
        <AppSearchView
          updateSearch={val => {
            this.onSearchHandler(val);
          }}
        />
        {/* <AppItemsView /> */}
        {this.state.brandsLoading ? (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{ marginTop: 150 }}
          />
        ) : this.state.brands.length === 0? <Text style={{marginLeft: 40, marginTop: 100}}>No Franchises within the Range of 35 Kms</Text>:<AppBrandsListView brands={this.state.brands} />
        
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    backgroundColor: "#171616",
    flexDirection: "row",
    height: 50
  },
  topBarIcon: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  topBarLogo: {
    alignItems: "center",
    justifyContent: "center"
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#47315a"
  },
  itemText: {
    alignItems: "flex-start",
    justifyContent: "center"
  },
  itemBtn: {
    alignItems: "center",
    justifyContent: "center"
  },
  containerItems: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#e5e5e5",
    // justifyContent: "center",
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#171616",
    padding: 10,
    width: 100,
    borderRightWidth: 0.25,
    borderColor: "#fff"
  },
  buttonSelected: {
    alignItems: "center",
    backgroundColor: "#171616",
    padding: 10,
    width: 100,
    borderWidth: 1.5,
    borderColor: "#fff",
    elevation: 20
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  icon: {
    width: 24,
    height: 24
  }
});

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
