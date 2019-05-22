import React, { Component } from "react";
import { View, Text, AsyncStorage, ScrollView, Dimensions } from "react-native";
import { Card, Badge, Input, Button } from "react-native-elements";
import { sendOrder } from "../../services/sendOrder";
import { getGroupedOrders } from "../../services/helperFunctions";

export default class CartMainScreen extends Component {
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
      this.setState({ cartItems: modifiedCart });
    });
  }
  setItemTotal(quantity, price, itemIndex) {
    let tempItems = this.state.cartItems;
    tempItems[itemIndex].quantity = quantity;
    tempItems[itemIndex].total = price * quantity;
    this.setState({
      cartItems: tempItems
    });
  }

  orderNowHandler() {
    console.log("getGroupedOrders is ", getGroupedOrders(this.state.cartItems));
    this.setState({ addingOrder: true });
    try {
      sendOrder(getGroupedOrders(this.state.cartItems));
      this.setState({ addingOrder: false });
      this.props.navigation.navigate("Landing");
    } catch (error) {
      console.log("Error Adding Order");
    }
  }
  render() {
    let dimensions = Dimensions.get("window");
    return (
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 0 }}
        >
          {this.state.cartItems.map((item, i) => {
            return (
              <Card key={i}>
                <View style={{ justifyContent: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>Item </Text>
                    <Text style={{ marginLeft: 27 }}>{item.name} </Text>
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
            {this.state.addingOrder ? (
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
      </View>
    );
  }
}
