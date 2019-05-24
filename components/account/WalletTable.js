import React, { Component } from "react";
import { StyleSheet, View, Text, Platform, Dimensions } from "react-native";
import Table from 'react-native-simple-table'


const columns = [
  {
    title: 'Order Number',
    dataIndex: 'orderNumber',
    width: 150
  },
  {
    title: 'Points',
    dataIndex: 'points',
    width: 70
  },
  {
    title: 'Bonus',
    dataIndex: 'bonus',
    width: 70
  },
  {
    title: 'Fine',
    dataIndex: 'fine',
    width: 70
  },
];
export default class WalletTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Order Number", "Bonus", "Fine", "Points"]
    };
  }

  render() {
    let dimensions = Dimensions.get('window')
    return (
      <View style={styles.container}>
        <View style={{alignItems: "center", marginTop: 20, marginBottom: 10}}>
        <Text style={{fontWeight: "bold"}}>Wallet</Text>
        </View>
        <Table height={dimensions.height * 0.75} columnWidth={60} columns={columns} dataSource={this.props.wallet}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 20
      },
      android: {}
    }),
  },
  title: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center'
  }
});
