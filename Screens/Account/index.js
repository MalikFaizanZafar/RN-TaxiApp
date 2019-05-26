import React, { Component } from "react";
import { View, Text, Image, ActivityIndicator, Alert } from "react-native";
import { getUser } from "../../services/getUser";
import { getUserWallet } from "../../services/getUserWallet";
import WalletTable from "../../components/account/WalletTable";
import AppTopBar from "../../components/AppTopBar";

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {}, wallet: [], walletLoading: true };
  }
  componentDidMount() {
    getUser().then(usr => {
      this.setState({ user: usr });
      getUserWallet(this.state.user.userId).then(walletResponse => {
        let tempArray = walletResponse.data.data;
        let walletArray = [];
        tempArray.forEach(wallet => {
          let walletObj = {
            orderNumber: wallet.order.orderNumber,
            points: wallet.points,
            bonus: wallet.bonus,
            fine: wallet.fine
          };
          walletArray.push(walletObj);
        });
        this.setState({ wallet: walletArray }, () => {
          this.setState({ walletLoading: false });
        });
      });
    });
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
        <View>
          {this.state.walletLoading ? (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{ marginTop: 150 }}
            />
          ) : (
            <View>
              <WalletTable wallet={this.state.wallet} />
            </View>
          )}
        </View>
      </View>
    );
  }
}
