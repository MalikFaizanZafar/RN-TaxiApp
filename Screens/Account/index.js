import React, { Component } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { getUser } from "../../services/getUser";
import { getUserWallet } from "../../services/getUserWallet";
import WalletTable from "../../components/account/WalletTable";

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {}, wallet : [], walletLoading: true };
  }
  componentDidMount() {
    getUser().then(usr => {
      this.setState({ user: usr });
      getUserWallet(this.state.user.userId).then(walletResponse => {
        let tempArray = walletResponse.data.data
        let walletArray = []
        tempArray.forEach(wallet => {
          let walletObj = {
            orderNumber: wallet.order.orderNumber,
            points: wallet.points,
            bonus: wallet.bonus,
            fine: wallet.fine
          }
          walletArray.push(walletObj)
        })
        this.setState({ wallet : walletArray}, () => {
          this.setState({ walletLoading : false})
        })
      })
    });
  }

  render() {
    return (
      <View>
        {
          this.state.walletLoading?<ActivityIndicator
          size="large"
          color="#000"
          style={{ marginTop: 150 }}
        />: (
          <View>
            <WalletTable wallet={this.state.wallet} ></WalletTable>
          </View>
        )
        }
      </View>
    );
  }
}
