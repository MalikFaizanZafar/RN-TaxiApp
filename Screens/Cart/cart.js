import React, { Component } from "react";
import { View, Text, AsyncStorage, ScrollView, Dimensions } from "react-native";
import { Card, Badge, Input, Button } from "react-native-elements";

export default class CartMainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("@SubQuch-User-cart").then(cartItems => {
      // this.setState({ cartItems: JSON.parse(cartItems)});
      let cartArray = JSON.parse(cartItems);
      console.log("cartArray is : ", cartArray);
      let modifiedCart = [];
      cartArray.forEach(item => {
        let newItem = {
          name: item.name,
          price: item.price,
          quantity: 0,
          total: 0
        };
        modifiedCart.push(newItem);
      });
      this.setState({ cartItems: modifiedCart });
      console.log("this.state is ", this.state);
    });
  }
  setItemTotal(quantity, price, itemIndex) {
    let tempItems = this.state.cartItems;
    tempItems[itemIndex].total = price * quantity;
    this.setState({
      cartItems: tempItems
    });
    console.log("modified cart Items are : ", this.state.cartItems);
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
                    <Badge
                      value={item.name}
                      badgeStyle={{
                        height: 30,
                        width: 100,
                        backgroundColor: "#171616",
                        marginLeft: 25
                      }}
                      textStyle={{ fontSize: 10, color: "#fff" }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10
                    }}
                  >
                    <Text>Price </Text>
                    <Badge
                      value={`${item.price} PKR`}
                      badgeStyle={{
                        height: 30,
                        width: 100,
                        backgroundColor: "#171616",
                        marginLeft: 25
                      }}
                      textStyle={{ fontSize: 10, color: "#fff" }}
                    />
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      width: dimensions.width * 0.5
                    }}
                  >
                    <Text>Quantity </Text>
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
                    <Text>Total :       {`${item.total} PKR`} </Text>
                  </View>
                </View>
              </Card>
            );
          })}
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10, marginBottom: 10}}>
          <Button
            title="Check Out"
            containerStyle={{width : 200}}
          />
          </View>
        </ScrollView>
      </View>
    );
  }
}
