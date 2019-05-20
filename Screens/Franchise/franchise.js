import React, { Component } from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { getFranchiseData } from "../../services/franchiseService";
import FranchiseInfoCard from "../../components/franchise/FranchiseInfoCard";
import FranchiseListView from "../../components/franchise/FranchiseListView";
import FranchiseCategoriesBar from "../../components/franchise/FranchiseCategoriesBar";
import FranchiseTabBar from "../../components/franchise/FranchiseTabBar";
import { getUniqueFranchiseCategories } from "../../services/helperFunctions";
import AppTopBar from "../../components/AppTopBar";
export default class FranchiseMainScreen extends Component {
  state = {
    franchise: {},
    categories: [],
    tabItems: ["Items", "Deals"],
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
  viewMapHandler(latitude, longitude){
    this.props.navigation.navigate('Map', { latitude , longitude})
  }
  itemPressHandler(item){
    console.log("currentItem is : ", item)
    this.props.navigation.navigate('Item', {item, franchiseId: this.state.franchise.id})
  }
  render() {
    const franchise = this.state.franchise;
    let dimensions = Dimensions.get("window");
    return (
      <View style={{ padding: 0 }}>
        <AppTopBar
          openSubquchDrawer={() => this.props.navigation.openDrawer()}
        />
        <FranchiseInfoCard franchiseInfo={franchise} viewMapPressed={(lat, lon) => this.viewMapHandler(lat, lon)} />
        <FranchiseCategoriesBar
          categories={this.state.categories}
          selectedCategory={id => this.onCategoryPressedHandler(id)}
        />
        <View style={{ height: dimensions.height * 0.50 }}>
          {this.state.dataLoading ? (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{ marginTop: 150 }}
            />
          ) : (
            <FranchiseListView
              data={
                this.state.selectedTab === 0
                  ? this.state.items
                  : this.state.deals
              }
              franchiseId={this.state.franchise.id}
              itemPressHandler={(itemId) => this.itemPressHandler(itemId)}
            />
          )}
        </View>
        <FranchiseTabBar
          tabItems={this.state.tabItems}
          tabClicked={id => this.tabClicked(id)}
          selectedTab={this.state.selectedTab}
        />
      </View>
    );
  }
}
