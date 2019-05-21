import React, { Component } from "react";
import { StyleSheet, View, Image, AsyncStorage } from "react-native";
import { Button, Avatar, Badge } from "react-native-elements";
import { cartItemsCount } from "../services/addToCart";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/internal/operators/takeUntil";

export default class AppTopBar extends Component {
  destroy$ = new Subject();
  constructor(props) {
    super(props);
    this.state = {
      cartItemsCount: 0
    }
  }
  componentDidMount(){
    AsyncStorage.getItem("@SubQuch-User-cart").then(itemsCount => {
      cartItemsCount.next(JSON.parse(itemsCount).length)
      this.setState({cartItemsCount: JSON.parse(itemsCount).length})
      // console.log("AppTopBar itemsCount(1) is : ", JSON.parse(itemsCount).length)
    })
    cartItemsCount.pipe(takeUntil(this.destroy$)).subscribe(cartCount => {
      // console.log("AppTopBar itemsCount(2) is : ", cartCount)
      this.setState({cartItemsCount: cartCount})
    })
  }
  componentWillUnmount(){
    this.destroy$.next();
    this.destroy$.complete();
  }
  render() {
    return (
      <View style={styles.topBar}>
        <View style={styles.topBarIcon}>
          <Button
            title="|||"
            type="outline"
            buttonStyle={{ marginLeft: 5, borderWidth: 0 }}
            titleStyle={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: 25,
              transform: [{ rotate: "90deg" }]
            }}
            onPress={this.props.openSubquchDrawer}
          />
        </View>
        <View style={{ marginLeft: 75, marginTop: 5 }}>
          <Image
            style={{ height: 42, width: 150 }}
            source={require("../assets/subquch2.png")}
          />
        </View>
        <View style={{ marginLeft: 50, marginTop: 10 }}>
          {/* <Badge value="99+" status="error" /> */}
          <View>
            <Avatar
              rounded
              source={require("./../assets/cart.jpg")}
              size="small"
            />

            <Badge
              value={this.state.cartItemsCount === null? 0: this.state.cartItemsCount}
              status="success"
              containerStyle={{ position: "absolute", top: 20, right: 25 }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#171616",
    flexDirection: "row",
    height: 50
  },
  topBarIcon: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});
