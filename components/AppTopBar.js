import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  AsyncStorage,
  Dimensions,
  TouchableOpacity
} from "react-native";
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
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("@SubQuch-User-cart").then(itemsCount => {
      if (itemsCount === null) {
        cartItemsCount.next(0);
      } else {
        let tempData = JSON.parse(itemsCount);
        cartItemsCount.next(tempData.length);
      }
    });
    cartItemsCount.pipe(takeUntil(this.destroy$)).subscribe(cartCount => {
      this.setState({ cartItemsCount: cartCount });
    });
  }
  componentWillUnmount() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  render() {
    let dimensions = Dimensions.get("window");
    return (
      <View style={styles.topBar}>
        <View style={styles.topBarIcon}>
          <Button
            title="|||"
            type="outline"
            buttonStyle={{ borderWidth: 0}}
            titleStyle={{
              fontWeight: "bold",
              padding: 5,
              color: "#fff",
              fontSize: 25,
              transform: [{ rotate: "90deg" }]
            }}
            onPress={this.props.openSubquchDrawer}
          />
        </View>
        <View style={{width: dimensions.width*0.6, alignItems: "center" }}>
          <Image
            style={{ height: dimensions.height*0.065, width: dimensions.width * 0.42 }}
            source={require("../assets/subquch2.png")}
          />
        </View>
        <View style={{ width: dimensions.width*0.2, alignItems: "flex-end", paddingRight:dimensions.width*0.03 }}>
        <TouchableOpacity
            onPress={() => this.props.onCartPress(this.state.cartItemsCount)}
          >
            <View>
              <Avatar
                rounded
                source={require("./../assets/cart.png")}
                size="small"
              />
              <Badge
                value={
                  this.state.cartItemsCount === null
                    ? 0
                    : this.state.cartItemsCount
                }
                status="success"
                containerStyle={{ position: "absolute", top: 20, right: 20 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
let dims = Dimensions.get("window");
const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#171616",
    flexDirection: "row",
    height: dims.height*0.08,
    alignItems: "center"
  },
  topBarIcon: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: dims.width*0.2
  }
});
