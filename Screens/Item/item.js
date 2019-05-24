import React, { Component } from "react";
import { View } from "react-native";
import AppTopBar from "../../components/AppTopBar";
import ItemView from "../../components/item/ItemView";
export default class ItemMainScreen extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };
  state = {
    itemDeal: {},
    franchiseId: 0
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const itemDeal = params ? params.itemDeal : null;
    const franchiseId = params ? params.franchiseId : null;
    this.setState({ itemDeal: itemDeal, franchiseId: franchiseId });
  }
  cartPressHandler() {
    this.props.navigation.navigate("Cart");
  }
  render() {
    return (
      <View>
        <AppTopBar
          openSubquchDrawer={() => this.props.navigation.openDrawer()}
          onCartPress={() => this.cartPressHandler()}
        />
        <ItemView
          item={this.state.itemDeal}
          franchiseId={this.state.franchiseId}
        />
      </View>
    );
  }
}
