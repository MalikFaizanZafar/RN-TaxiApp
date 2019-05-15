import React, { Component } from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { getFranchiseData } from "../../services/franchiseService";
import FranchiseInfoCard from "../../components/franchise/FranchiseInfoCard";
import FranchiseListView from "../../components/franchise/FranchiseListView";
import FranchiseCategoriesBar from "../../components/franchise/FranchiseCategoriesBar";
import FranchiseTabBar from "../../components/franchise/FranchiseTabBar";
export default class FranchiseMainScreen extends Component {
  state = {
    franchise: {},
    tabItems: ['Items', 'Deals'],
    selectedTab: 0,
    dataLoading: true
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const franchiseId = params ? params.franchiseId : null;
    getFranchiseData(franchiseId).then(getFranchiseDataResponse => {
      this.setState({
        franchise: getFranchiseDataResponse.data.data,
        dataLoading: false
      });
    });
  }
  tabClicked(id) {
    console.log("franchise tab id is : ", id)
    this.setState({
      selectedTab: id
    });
  }
  render() {
    const franchise = this.state.franchise;
    let dimensions = Dimensions.get("window");
    return (
      <View style={{ padding: 0 }}>
        <FranchiseInfoCard franchiseInfo={franchise} />
        <FranchiseCategoriesBar />
        <View style={{height: dimensions.height* 0.645}}>
        {this.state.dataLoading ? (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{ marginTop: 150 }}
          />
        ) : (
          <FranchiseListView data={franchise.items}/>
        )}
        </View>
        <FranchiseTabBar tabItems={this.state.tabItems}  tabClicked={(id) => this.tabClicked(id)} selectedTab={this.state.selectedTab} />
      </View>
    );
  }
}
