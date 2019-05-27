import React, { Component } from "react";
import { View, Alert } from "react-native";
import AppTopBar from "../../components/AppTopBar";
import ItemView from "../../components/item/ItemView";
import { itemCartStatus } from "../../services/itemCartStatus";
export default class ItemMainScreen extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };
  state = {
    itemDeal: {},
    franchiseId: 0,
    itemExistsInCart: true
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const itemDeal = params ? params.itemDeal : null;
    const franchiseId = params ? params.franchiseId : null;
    this.setState({ itemDeal: itemDeal, franchiseId: franchiseId }, () => {
      itemCartStatus(this.state.itemDeal.id).then(itemStatus => {
        this.setState({ itemExistsInCart: itemStatus });
      });
    });
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
      <View>
        <AppTopBar
          openSubquchDrawer={() => this.props.navigation.openDrawer()}
          onCartPress={cartItemsCount => this.cartPressHandler(cartItemsCount)}
        />
        <ItemView
          item={this.state.itemDeal}
          franchiseId={this.state.franchiseId}
          itemStatus={this.state.itemExistsInCart}
          backToFranchiseItems={() => {
            this.props.navigation.goBack(null);
          }}
        />
      </View>
    );
  }
}
