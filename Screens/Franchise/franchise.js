import React, { Component } from "react";
import { View, ActivityIndicator, Dimensions, Alert } from "react-native";
import { getFranchiseData } from "../../services/franchiseService";
import FranchiseInfoCard from "../../components/franchise/FranchiseInfoCard";
import FranchiseListView from "../../components/franchise/FranchiseListView";
import FranchiseCategoriesBar from "../../components/franchise/FranchiseCategoriesBar";
import FranchiseTabBar from "../../components/franchise/FranchiseTabBar";
import { getUniqueFranchiseCategories } from "../../services/helperFunctions";
import AppTopBar from "../../components/AppTopBar";
export default class FranchiseMainScreen extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };

  state = {
    franchise: {},
    categories: [],
    tabItems: ["Deals", "Items", "Reviews"],
    selectedTab: 0,
    dataLoading: true
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const franchiseId = params ? params.franchiseId : null;
    getFranchiseData(franchiseId).then(getFranchiseDataResponse => {
      this.setState({
        franchise: getFranchiseDataResponse.data.data,
        items: getFranchiseDataResponse.data.data.items,
        deals: getFranchiseDataResponse.data.data.deals,
        reviews: getFranchiseDataResponse.data.data.reviews,
        categories: getUniqueFranchiseCategories(
          getFranchiseDataResponse.data.data.items
        ),
        dataLoading: false
      });
    });
  }
  tabClicked(id) {
    this.setState({
      selectedTab: id
    });
  }
  onCategoryPressedHandler(id) {
    if (id === -1) {
      this.setState({
        items: this.state.franchise.items
      });
    } else {
      let filtereItems = this.state.franchise.items.filter(
        item => item.category.id === id
      );
      this.setState({
        items: filtereItems
      });
    }
  }
  viewMapHandler(latitude, longitude) {
    this.props.navigation.navigate("Map", { latitude, longitude });
  }
  itemPressHandler(itemDeal) {
    if (this.state.selectedTab === 0) {
      this.props.navigation.navigate("Item", {
        itemDeal: { ...itemDeal, type: "deal" },
        franchiseId: this.state.franchise.id
      });
    } else if (this.state.selectedTab === 1) {
      this.props.navigation.navigate("Item", {
        itemDeal: { ...itemDeal, type: "item" },
        franchiseId: this.state.franchise.id
      });
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
    const franchise = this.state.franchise;
    let dimensions = Dimensions.get("window");
    return (
      <View style={{ padding: 0 }}>
        <AppTopBar
          openSubquchDrawer={() => this.props.navigation.openDrawer()}
          onCartPress={cartItemsCount => this.cartPressHandler(cartItemsCount)}
        />
        <FranchiseInfoCard
          franchiseInfo={franchise}
          viewMapPressed={(lat, lon) => this.viewMapHandler(lat, lon)}
          loading={this.state.dataLoading}
        />
        <FranchiseCategoriesBar
          categories={this.state.categories}
          selectedCategory={id => this.onCategoryPressedHandler(id)}
        />
        <View>
          {this.state.dataLoading ? (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{ marginTop: 150 }}
            />
          ) : (
            <FranchiseListView
              data={
                this.state.selectedTab === 1
                  ? this.state.items
                  : this.state.selectedTab === 0
                  ? this.state.deals
                  : this.state.reviews
              }
              selectedTab={this.state.selectedTab}
              franchiseId={this.state.franchise.id}
              itemPressHandler={itemId => this.itemPressHandler(itemId)}
            />
          )}
        </View>
        <View>
          {this.state.dataLoading ? null : (
            <FranchiseTabBar
              tabItems={this.state.tabItems}
              tabClicked={id => this.tabClicked(id)}
              selectedTab={this.state.selectedTab}
            />
          )}
        </View>
      </View>
    );
  }
}
