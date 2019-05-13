import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
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
    search: "",
    brands: [],
    searchKey: '',
    brandsLoading: true
  };
  componentDidMount() {
    console.log("componentDidMount");
    console.log('componentDidMount brandsLoading 1 : ', this.state.brandsLoading)
    axios
      .get(`${URL}/api/auth/filter?lat=33.494276&long=73.1012208&distance=35`)
      .then(brandsResponse => {
        this.setState({ brands: brandsResponse.data.data, brandsLoading: false });
        console.log('componentDidMount brandsLoading 2 : ', this.state.brandsLoading)
      })
      .catch(brandsError => {
        console.log("brandsError is : ", brandsError);
      });
  }

  onSearchHandler(searchKey) {
    this.setState({ brandsLoading: true });
    axios
      .get(`${URL}/api/auth/filter?lat=33.494276&long=73.1012208&distance=35&filter=${searchKey}`)
      .then(brandsResponse => {
        this.setState({ brands: brandsResponse.data.data,  brandsLoading: false });
      })
      .catch(brandsError => {
        console.log("brandsError is : ", brandsError);
      });
  }
  updateSearch = search => {
    this.setState({ search });
    console.log('search in Parent has : ', search)
  };
  render() {
    return (
      <View style={styles.container}>
        <AppTopBar openSubquchDrawer={() => this.props.navigation.openDrawer()}/>
        <AppSearchView updateSearch={ val => {
           this.onSearchHandler(val)
        }}/>
        {/* <AppItemsView /> */}
        {/* <AppBrandsListView brands={this.state.brands}/> */}
        {this.state.brandsLoading?<ActivityIndicator size="large" color="#000" style={{ marginTop: 150 }}/>:<AppBrandsListView brands={this.state.brands}/>
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
