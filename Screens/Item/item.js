import React, { Component } from "react";
import { View, Alert } from "react-native";
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
  cartPressHandler(cartItemsCount) {
    if(cartItemsCount > 0){
      this.props.navigation.navigate("Cart");
    }else{
      Alert.alert(
        'SubQuch Alert',
        'No Item or Deals in the Cart. Please Add Some Items or Deals',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  }
  render() {
    return (
      <View>
        <AppTopBar
          openSubquchDrawer={() => this.props.navigation.openDrawer()}
          onCartPress={(cartItemsCount) => this.cartPressHandler(cartItemsCount)}
        />
        <ItemView
          item={this.state.itemDeal}
          franchiseId={this.state.franchiseId}
        />
      </View>
    );
  }
}
