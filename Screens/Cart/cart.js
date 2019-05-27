import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from "react-native";
import { Card, Input, Button } from "react-native-elements";
import { sendOrder } from "../../services/sendOrder";
import { getGroupedOrders } from "../../services/helperFunctions";
import { deleteCartItem } from "../../services/deleteCartItem";

export default class CartMainScreen extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      addingOrder: false
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("@SubQuch-User-cart").then(cartItems => {
      let cartArray = JSON.parse(cartItems);
      let modifiedCart = [];
      cartArray.forEach(item => {
        let newItem = {
          id: item.id,
          name: item.name,
          type: item.type,
          price: item.price,
          quantity: 0,
          total: 0,
          franchiseId: item.franchiseId
        };
        modifiedCart.push(newItem);
      });
      this.setState({
        cartItems: modifiedCart
      });
    });
  }
  setItemTotal(quantity, price, itemIndex) {
    if (this.state.itemsNumber === 1) {
      this.setState({
        itemDeal: {
          quantity: quantity,
          total: price * quantity
        }
      });
    } else {
      let tempItems = this.state.cartItems;
      tempItems[itemIndex].quantity = quantity;
      tempItems[itemIndex].total = price * quantity;
      this.setState({
        cartItems: tempItems
      });
    }
  }

  continueWithOrder() {
    this.setState({ addingOrder: true });
    sendOrder(getGroupedOrders(this.state.cartItems))
      .then(sendOrderResponse => {
        this.setState({ addingOrder: false });
        console.log("sendOrderResponse is : ", sendOrderResponse);
        this.props.navigation.goBack(null);
      })
      .catch(error => {
        console.log("Error Adding Order ", error);
      });
  }

  orderNowHandler() {
    console.log("addingOrder is : ", this.state.addingOrder);
    if (getGroupedOrders(this.state.cartItems).length > 1) {
      Alert.alert(
        "Order Alert",
        "This Order is from Multiple Vendors. Do You Still want to Continue ?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => this.continueWithOrder() }
        ],
        { cancelable: false }
      );
    } else {
      this.continueWithOrder();
    }
  }
  deleteCartItemHandler(id) {
    console.log("deleteCartItemHandler id is : ", id);
    deleteCartItem(id).then(cartItems => {
      this.setState({
        cartItems: this.state.cartItems.filter(item => item.id !== id)
      });
      // if (this.state.cartItems.length === 0) {
      //   this.props.navigation.goBack(null);
      // }
    });
  }
  onPressDeleteHandler(itemId) {
    Alert.alert(
      "SubQuch Alert",
      "Are You Sure You Want to Delete this Item / Deal from Your Cart ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.deleteCartItemHandler(itemId) }
      ],
      { cancelable: false }
    );
    console.log("Delete Item itemId is ", itemId);
  }
  render() {
    let dimensions = Dimensions.get("window");
    return (
      <View>
        {this.state.cartItems.length === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center", height: dimensions.height}}>
            <Text style={{fontWeight: "bold"}}>No Items in The Cart</Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 0 }}
          >
            {this.state.cartItems.map((item, i) => {
              return (
                <Card key={i}>
                  <View style={{ justifyContent: "center" }}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text>Item </Text>
                      <Text style={{ marginLeft: 27 }}>{item.name} </Text>
                      <TouchableOpacity
                        style={{ marginLeft: 140 }}
                        onPress={() => this.onPressDeleteHandler(item.id)}
                      >
                        <Text style={{ color: "red" }}> Delete </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 10
                      }}
                    >
                      <Text>Price </Text>
                      <Text style={{ marginLeft: 25 }}>{item.price} </Text>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                        width: dimensions.width * 0.5
                      }}
                    >
                      <Text style={{ marginTop: 10 }}>Quantity </Text>
                      <Input
                        placeholder="Quantity"
                        keyboardType="numeric"
                        onChangeText={quantity => {
                          this.setItemTotal(quantity, item.price, i);
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 10
                      }}
                    >
                      <Text>Total : {`${item.total} PKR`} </Text>
                    </View>
                  </View>
                </Card>
              );
            })}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 10
              }}
            >
              {this.state.addingOrder == true ? (
                <ActivityIndicator
                  size="large"
                  color="#000"
                  style={{ marginTop: 10 }}
                />
              ) : (
                <View>
                  <Button
                    title="Check Out"
                    containerStyle={{ width: 200 }}
                    onPress={() => this.orderNowHandler()}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
