import React, { Component } from "react";
import { View, Text, ImageBackground, Dimensions, Alert } from "react-native";
import { Card, Rating, Badge, Button } from "react-native-elements";
import { addToCart } from "../../services/addToCart";
export default class ItemView extends Component {
  addToCardHandler() {
    console.log("Add to Cart Pressed");
    // this.props.itemPressHandler(datum)
    // this.props.navigation.navigate('Item')
    let cartItemDeal = {
      id: this.props.item.id,
      name: this.props.item.name,
      type: this.props.item.type,
      price: this.props.item.price,
      discount: this.props.item.discount,
      franchiseId: this.props.franchiseId
    };
    Alert.alert(
      "Cart",
      "Add This Item/Deal to the Cart?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.addToCartFunction(cartItemDeal) }
      ],
      { cancelable: false }
    );
  }

  addToCartFunction = data => {
    addToCart(data);
  };
  render() {
    let dimensions = Dimensions.get("window");
    return (
      <View style={{ width: dimensions.width, padding: 0 }}>
        <Card containerStyle={{ padding: 0 }}>
          <View style={{ width: dimensions.width, padding: 0 }}>
            <ImageBackground
              style={{
                height: dimensions.height * 0.5,
                width: dimensions.width * 0.915
              }}
              source={{ uri: this.props.item.image_url }}
            >
              <Button
                title="Add to Cart"
                titleStyle={{ fontSize: 10 }}
                containerStyle={{
                  width: dimensions.width * 0.24,
                  marginTop: 280,
                  marginLeft: 235
                }}
                onPress={() => {
                  this.addToCardHandler();
                }}
              />
            </ImageBackground>
          </View>
          <View
            style={{
              width: dimensions.width,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              padding: 5
            }}
          >
            <Text
              style={{
                width: dimensions.width * 0.5,
                fontSize: 20,
                fontWeight: "400"
              }}
            >
              {this.props.item.name}
            </Text>
            <Rating imageSize={25} readonly startingValue={3} />
          </View>
          <View style={{ width: dimensions.width, marginTop: 10, padding: 5 }}>
            <Text>{this.props.item.description}</Text>
          </View>
          <View style={{ width: dimensions.width, alignItems: "flex-end" }}>
            <Badge
              value={this.props.item.price}
              badgeStyle={{
                height: 25,
                width: 75,
                backgroundColor: "#171616",
                marginTop: 10,
                marginRight: 40,
                marginBottom: 10
              }}
              textStyle={{ fontSize: 10, color: "#fff" }}
            />
          </View>
        </Card>
      </View>
    );
  }
}
